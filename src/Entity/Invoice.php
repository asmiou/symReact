<?php

namespace App\Entity;

use ApiPlatform\Core\{Annotation\ApiFilter, Bridge\Doctrine\Orm\Filter\OrderFilter, Annotation\ApiResource};
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\InvoiceRepository")
 * @ApiResource(
 *  attributes={
 *     "pagination_enabled"=false,
 *     "pagination_items_per_page"=35,
 *     "order": {"amount": "desc"}
 *  },
 *  normalizationContext={
 *     "groups"={"invoiceRead"}
 *  },
 *  denormalizationContext={
 *      "disable_type_enforcement"=true
 *  },
 *  subresourceOperations={
 *     "api_customer_invoices_get_subresource"={
 *          "normalization_context"={
 *              "groups"={"invoice_subResource"}
 *          }
 *      }
 *  },
 *  itemOperations={
 *     "GET",
 *     "PUT",
 *     "DELETE",
 *     "increment"={
 *          "method"="POST",
 *          "path"="/invoices/{id}/increment",
 *          "controller"="App\Controller\InvoiceIncrementationController",
 *          "swagger_context"={
 *              "summary"="Increment une facture",
 *              "description"="Incrément la réference de la facture lors de la création d'une nouvelle facture"
 *          }
 *      }
 *   },
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
     * @Groups({"invoiceRead"})
     */

    private $id;

    /**
     * @ORM\Column(type="float")
     * @Groups({"invoiceRead", "customerRead", "invoice_subResource"})
     * @Assert\GreaterThan(
     *     value=0,
     *     message="Le montant ne peut pas être null ou inférieur à zéro"
     * )
     * @Assert\Type(
     *     type="numeric",
     *     message="Le montant doit être numérique"
     * )
     *
     */
    private $amount;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"invoiceRead", "customerRead", "invoice_subResource"})
     * @Assert\DateTime(
     *      message="La date doit être au format YYYY-MM-DD"
     * )
     */
    private $sentAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"invoiceRead", "customerRead", "invoice_subResource"})
     * @Assert\Choice(
     *     choices={"SENT","PAID","CANCELLED"},
     *     message="Le status est incorrecte, il doit être SENT PAID ou CANCELLED"
     * )
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Customer", inversedBy="invoices")
     * @Groups({"invoiceRead"})
     */
    private $customer;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"invoiceRead", "invoice_subResource" })
     * @Assert\NotBlank(
     *      message="La reférence est obligation"
     * )
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

    public function setAmount($amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt($sentAt): self
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
