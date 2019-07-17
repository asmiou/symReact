<?php

namespace App\Entity;

use ApiPlatform\Core\{Annotation\ApiFilter, Bridge\Doctrine\Orm\Filter\OrderFilter, Annotation\ApiResource};
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\InvoiceRepository")
 * @ApiResource(
 *  attributes={
 *     "pagination_enabled"=true,
 *     "pagination_items_per_page"=35,
 *     "order": {"amount": "desc"}
 *     },
 *  normalizationContext={
 *     "groups"={"invoiceRead"}
 *     }
 * )
 * @ApiFilter(
 *      OrderFilter::class,
 *      properties={"amount", "sentAt"}
 * )
 */
class Invoice
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(type="guid", unique=true)
     */

    private $id;

    /**
     * @ORM\Column(type="float")
     * @Groups({"invoiceRead", "customerRead"})
     */
    private $amount;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"invoiceRead", "customerRead"})
     */
    private $sentAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"invoiceRead", "customerRead"})
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Customer", inversedBy="invoices")
     * @Groups({"invoiceRead"})
     */
    private $customer;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"invoiceRead"})
     */
    private $reference;

    /**
     * Récupere le user associé de la facture
     * @return User
     * @Groups({"invoiceRead"})
     */
    public function getUser(): User{
        return $this->customer->getUser();
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt(\DateTimeInterface $sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getReference(): ?int
    {
        return $this->reference;
    }

    public function setReference(int $reference): self
    {
        $this->reference = $reference;

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
