<?php


namespace App\Controller;


use App\Entity\Invoice;
use Doctrine\Common\Persistence\ObjectManager;

class InvoiceIncrementationController{
    /**
     * @var ObjectManager
     */
    private $manager;

    public function __construct(ObjectManager $manager){
        $this->manager = $manager;
    }

    public function __invoke(Invoice $data){
        $data->setReference($data->getReference()+1);
        $this->manager->flush();
        return$data;

    }
}
