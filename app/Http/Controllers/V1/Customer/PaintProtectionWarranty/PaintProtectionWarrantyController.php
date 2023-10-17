<?php

namespace Crater\Http\Controllers\V1\Customer\PaintProtectionWarranty; 

use Crater\Http\Controllers\Controller;
use Crater\Http\Resources\Customer\PaintProtectionWarrantyResource;
use Crater\Models\Company;
use Crater\Models\PaintProtectionWarranty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Vinkla\Hashids\Facades\Hashids;

class PaintProtectionWarrantyController  extends Controller
{
  /**
  * Display a listing of the resource.
  *
  * @return \Illuminate\Http\Response
  */
  public function index(Request $request) 
  {
    $limit = $request->has('limit') ? $request->limit : 10;

    $protectionPlanWarranties = PaintProtectionWarranty::applyFilters($request->all())
      ->whereCustomer(Auth::guard('customer')->id())
      ->latest()
      ->paginateData($limit);

    return (PaintProtectionWarrantyResource::collection($protectionPlanWarranties))
      ->additional(['meta' => [
        'paintProtectionWarrantyTotalCount' => PaintProtectionWarranty::whereCustomer(Auth::guard('customer')->id())->count(),
      ]]);
  }

  public function store(Request $request)
  {
    $request->validate([
      'vehicle_sale_date' => 'required|date',
      'vin' => 'nullable|string|max:255',
      'vehicle_year' => 'nullable|date',
      'make' => 'nullable|string|max:255',
      'model' => 'nullable|string|max:255',
      'mileage' => 'nullable|integer',
      'vehicle_price' => 'nullable|numeric|between:0,99999999.99',
      'contract_price' => 'nullable|numeric|between:0,99999999.99',
      'owner_name' => 'nullable|string|max:255',
      'owner_address' => 'nullable|string|max:255',
      'owner_primary_phone' => 'nullable|string|max:255',
      'owner_city' => 'nullable|string|max:255',
      'owner_state' => 'nullable|string|max:255',
      'owner_zip' => 'nullable|string|max:255',
      'dealer_name' => 'nullable|string|max:255',
      'dealer_lien_holder' => 'nullable|string|max:255',
      'dealer_primary_phone' => 'nullable|string|max:255',
      'dealer_phone' => 'nullable|string|max:255',
      'dealer_city' => 'nullable|string|max:255',
      'dealer_state' => 'nullable|string|max:255',
      'dealer_zip' => 'nullable|string|max:255',
      'request_deletion' => 'required|boolean',
    ]);

    $paintProtectionWarranty = PaintProtectionWarranty::create(array_merge(
      $request->all(),
      ['customer_id' => Auth::guard('customer')->id()]
    ));

    // Gere o hash para o ID do PaintProtectionWarranty recém-criado
    $unique_hash = Hashids::connection(PaintProtectionWarranty::class)->encode($paintProtectionWarranty->id);

    // Atualize o PaintProtectionWarranty com o hash
    $paintProtectionWarranty->update(['unique_hash' => $unique_hash]);

    return new PaintProtectionWarrantyResource($paintProtectionWarranty);
  }
  
  public function show(Company $company, $id)
  {
    $paintProtectionWarranty = $company->paintProtectionWarranties()
      ->whereCustomer(Auth::guard('customer')->id())
      ->where('id', $id)
      ->first();

    if(!$paintProtectionWarranty) {
      return response()->json(['error' => 'paintProtectionWarranty_not_found'], 404);
    } 

    return new PaintProtectionWarrantyResource($paintProtectionWarranty);
  }

  public function update(Request $request, $id)
  {
    $paintProtectionWarranty = PaintProtectionWarranty::where('id', $request->id)
      ->where('customer_id', Auth::guard('customer')->id())
      ->first();

    if (!$paintProtectionWarranty) {
      return response()->json(['error' => 'paintProtectionWarranty_not_found'], 404);
    }

    // Gere o hash do ID
    $unique_hash = Hashids::connection(PaintProtectionWarranty::class)->encode($request->id);

    // Prepare os dados para atualização, incluindo o hash
    $dataToUpdate = $request->all();
    $dataToUpdate['unique_hash'] = $unique_hash;

    $paintProtectionWarranty->update($dataToUpdate);

    return new PaintProtectionWarrantyResource($paintProtectionWarranty);
  }
}