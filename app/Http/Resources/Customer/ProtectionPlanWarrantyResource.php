<?php

namespace Crater\Http\Resources\Customer;

use Illuminate\Http\Resources\Json\JsonResource;

class ProtectionPlanWarrantyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return[
            'id' => $this->id,
            'vehicle_sale_date' => $this->vehicle_sale_date,
            'vin' => $this->vin,
            'vehicle_year' => $this->vehicle_year,
            'make' => $this->make,
            'model' => $this->model,
            'mileage' => $this->mileage,
            'vehicle_price' => $this->vehicle_price,
            'contract_price' => $this->contract_price,
            'owner_name' => $this->owner_name,
            'owner_address' => $this->owner_address,
            'owner_primary_phone' => $this->owner_primary_phone,
            'owner_city' => $this->owner_city,
            'owner_state' => $this->owner_state,
            'owner_zip' => $this->owner_zip,
            'dealer_name' => $this->dealer_name,
            'dealer_lien_holder' => $this->dealer_lien_holder,
            'dealer_primary_phone' => $this->dealer_primary_phone,
            'dealer_phone' => $this->dealer_phone,
            'dealer_address' => $this->dealer_address,
            'dealer_city' => $this->dealer_city,
            'dealer_state' => $this->dealer_state,
            'dealer_zip' => $this->dealer_zip,
            'request_deletion' => $this->request_deletion,
            'formatted_created_at' => $this->formattedCreatedAt,
            'formatted_vehicle_sale_date' => $this->formattedVehicleSaleDate,
            'paint-protection-warranty_pdf_url' => $this->paintProtectionWarrantyPdfUrl,
            'unique_hash' => $this->unique_hash,
            'customer' => $this->when($this->customer()->exists(), function () {
              return new CustomerResource($this->customer);
            }),
            'company' => $this->when($this->company()->exists(), function () {
              return new CompanyResource($this->company);
            }),
          ];
    }
}