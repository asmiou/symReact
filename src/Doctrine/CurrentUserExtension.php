<?php
namespace App\Doctrine;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Customer;
use App\Entity\Invoice;
use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Security;

class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    private $security;
    private $auth;

    public function __construct(Security $security, AuthorizationCheckerInterface $auth){
        $this->security = $security;
        $this->auth = $auth;
    }

    public function applyToCollection(QueryBuilder $queryBuilder,
                                      QueryNameGeneratorInterface $queryNameGenerator,
                                      string $resourceClass,
                                      string $operationName = null)
    {
        $this->addUseOnQuery($queryBuilder, $resourceClass);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator,string $resourceClass,array $identifiers,
                                string $operationName = null,
                                array $context = [])
    {
        $this->addUseOnQuery($queryBuilder, $resourceClass);
    }

    public function addUseOnQuery(QueryBuilder $queryBuilder, string $resourceClass){

        //On recupère l'utilisateur connecté
        $user = $this->security->getUser();
        if($user instanceof User){
            $this->addWhere($queryBuilder, $resourceClass, $user);
        }
    }

    public function addWhere(QueryBuilder $queryBuilder, string $resourceClass, User $user){
        // il faut chaupper l'alias utilisé
        $alias = $queryBuilder->getRootAliases()[0];

        //Si c'est une requête concernant un client
        if($resourceClass === Customer::class && !$this->auth->isGranted('ROLE_ADMIN')){
            $queryBuilder
                ->andWhere("$alias.user = :user")
                ->setParameter('user', $user);
        }

        //Si c'est une requête concernant une facture
        if($resourceClass === Invoice::class && !$this->auth->isGranted('ROLE_ADMIN')){
            $queryBuilder
                ->join("$alias.customer", "c")
                ->andWhere("c.user = :user")
                ->setParameter('user', $user);
        }
    }
}
