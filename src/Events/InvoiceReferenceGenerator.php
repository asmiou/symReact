<?php


namespace App\Events;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class InvoiceReferenceGenerator implements EventSubscriberInterface
{
    private $security;
    private $repository;
    public function __construct(Security $security, InvoiceRepository $repository){
        $this->security = $security;
        $this->repository = $repository;
    }

    /**
     * Returns an array of event names this subscriber wants to listen to.
     *
     * The array keys are event names and the value can be:
     *
     *  * The method name to call (priority defaults to 0)
     *  * An array composed of the method name to call and the priority
     *  * An array of arrays composed of the method names to call and respective
     *    priorities, or 0 if unset
     *
     * For instance:
     *
     *  * ['eventName' => 'methodName']
     *  * ['eventName' => ['methodName', $priority]]
     *  * ['eventName' => [['methodName1', $priority], ['methodName2']]]
     *
     * @return array The event names to listen to
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW =>['generateReference', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function generateReference(GetResponseForControllerResultEvent $event){
        $invoice = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if($invoice instanceof Invoice){
            if($method === 'POST'){
                //Trouver l'utilisateur connecté pour générer successivement la reference de sa facutre
                $user = $this->security->getUser();
                //Faire une DQL pour recuperer la reference de la dernier factur pour l'incrémenter
                $ref = $this->repository->findLastReferenceByUser($user) +1;
                //Mettre à jour la reference de la facture encour
                $invoice->setReference($ref);

                // TODO: A déplacer dans une autre classe
                if(empty($invoice->getSentAt())){
                    $invoice->setSentAt(new \DateTime('now'));
                }
            }
        }
    }
}
