<?php


namespace App\Events;


use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtTokenCustom{

    public function updateJwtData(JWTCreatedEvent $event){
        // recupérer l'utilisateur
        /**
         * @var User
         */
        $user = $event->getUser();
        // enrichier les données.
        $payLoad = $event->getData();
        $payLoad['firstName'] = $user->getFirstName();
        $payLoad['lastName'] = $user->getLastName();

        //mettre à jour le token
        $event->setData($payLoad);
    }

}
