<?php

namespace App\DataFixtures;

use App\Entity\Customer;
use App\Entity\Invoice;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    /**
     * l'encoder de mot de passe
     * @var UserPasswordEncoderInterface
     */
    private $encoder;
    public function __construct(UserPasswordEncoderInterface $encoder){
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager){

        $faker = Factory::create('fr_FR');
        for ($u=0; $u<10; $u++){
            $user = new User();
            $pass = $this->encoder->encodePassword($user,'password');
            $user->setFirstName($faker->firstName)
                ->setLastName($faker->lastName)
                ->setEmail($faker->email)
                ->setPassword($pass)
                ;
            $manager->persist($user);

            $chrono = null;
            for($i = 0; $i<rand(5,20); $i++){
                $chrono = 1;
                $customer = new Customer();
                $customer->setFirstName($faker->firstName())
                    ->setLastName($faker->lastName)
                    ->setEmail($faker->email)
                    ->setCompany($faker->company)
                    ->setUser($user);

                $manager->persist($customer);

                for($j =0; $j < rand(3,10); $j++){
                    $invoice = new Invoice();
                    $invoice->setAmount($faker->randomFloat(2, 700, 2500))
                        ->setSentAt(new \DateTime('now'))
                        ->setStatus($faker->randomElement(['SENT', 'PAID', 'CANCELED']))
                        ->setReference($chrono)
                        ->setCustomer($customer);

                    $manager->persist($invoice);
                    $chrono++;
                }
            }
        }

        $manager->flush();
    }
}
