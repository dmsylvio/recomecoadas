<?php

namespace Crater\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PlainsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'vin' => $this->vin,
            'model' => $this->model,
            'make' => $this->make,
            'notes' => $this->notes,
            'creator_id' => $this->creator_id,
            'employee_id' => $this->employee_id,
            'customer_id' => $this->customer_id,
            'formatted_created_at' => $this->formattedCreatedAt,
            'formatted_due_date' => $this->formattedDueDate,
            'updated_at' => $this->updated_at,
            'created_at' => $this->created_at,
            'employee' => $this->when($this->employee()->exists(), function () {
                return new UserResource($this->creator);
            }),
            'customer' => $this->when($this->customer()->exists(), function () {
                return new CustomerResource($this->customer);
            }),
            'creator' => $this->when($this->creator()->exists(), function () {
                return new UserResource($this->creator);
            }),
            'company' => $this->when($this->company()->exists(), function () {
                return new CompanyResource($this->company);
            }),
        ];
    }
}
