<?php

namespace App\Entity;

use ApiPlatform\{Core\Annotation\ApiFilter,
    Core\Bridge\Doctrine\Orm\Filter\SearchFilter,
    Core\Annotation\ApiResource};
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CustomerRepository")
 * @ApiResource(
 *      normalizationContext={
 *          "groups"={"customerRead"}
 *     }
 * )
 * @ApiFilter(
 *      SearchFilter::class,
 *      properties={"firstName": "start", "lastName":"start", "company":"partial"}
 * )
 * @ApiFilter(
 *      OrderFilter::class,
 * )
 */
class Customer
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(type="guid", unique=true)
     */

    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"invoiceRead"})
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"invoiceRead"})
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"customerRead","invoiceRead"})
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"customerRead","invoiceRead"})
     */
    private $company;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Invoice", mappedBy="customer")
     * @Groups({"customerRead"})
     */
    private $invoices;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="customers")
     */
    private $user;

    /**
     * La fonction fait une reduce sur chaque invoice (Invoices est un arrayCollection
     * qu'il faut transformer en array),
     * pour le quel elle recupère son montant l'ajoute au total
     * deja calculé, on initialise le total à 0.
     *
     * @return float
     * @Groups({"customerRead"})
     */
    public function getTotalAmount(): float {
        return array_reduce($this->invoices->toArray(), function(float $total, Invoice $invoice){
            return $total+$invoice->getAmount();
        }, 0);
    }

    /**
     * Cette fonction calcule le montatnt totale des factures non payé par l'utilisateur
     * Si la facture est payé ou annuler, on ne la prend pas encompte sinon on calcul
     * @return float
     * @Groups({"customerRead"})
     */
    public function getUnpaidAmount(): float {
        return array_reduce($this->invoices->toArray(), function(float $total, Invoice $invoice){
            return $total+(($invoice->getStatus() === "PAID"
                    || $invoice->getStatus() === "CANCELLED")
                    ?0
                    :$invoice->getAmount()
                );
        },0);
    }

    public function __construct()
    {
        $this->invoices = new ArrayCollection();
    }


    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(?string $company): self
    {
        $this->company = $company;

        return $this;
    }

    /**
     * @return Collection|Invoice[]
     */
    public function getInvoices(): Collection
    {
        return $this->invoices;
    }

    public function addInvoice(Invoice $invoice): self
    {
        if (!$this->invoices->contains($invoice)) {
            $this->invoices[] = $invoice;
            $invoice->setCustomer($this);
        }

        return $this;
    }

    public function removeInvoice(Invoice $invoice): self
    {
        if ($this->invoices->contains($invoice)) {
            $this->invoices->removeElement($invoice);
            // set the owning side to null (unless already changed)
            if ($invoice->getCustomer() === $this) {
                $invoice->setCustomer(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function __toString(){
        return (string) $this->getId();
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

}
