<?php

namespace Crater\Http\Controllers\V1\Customer\ProtectionPlanWarranty;

use Crater\Http\Controllers\Controller;
use Crater\Http\Resources\Customer\ProtectionPlanWarrantyResource;
use Crater\Models\Company;
use Crater\Models\ProtectionPlanWarranty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProtectionPlanWarrantyController  extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $limit = $request->has('limit') ? $request->limit : 10;

        $protectionPlanWarranties = ProtectionPlanWarranty::applyFilters($request->all())
            ->whereCustomer(Auth::guard('customer')->id())
            ->latest()
            ->paginateData($limit);
        
        return (ProtectionPlanWarrantyResource::collection($protectionPlanWarranties))
            ->additional(['meta' => [
                'protectionPlanWarrantyTotalCount' => ProtectionPlanWarranty::whereCustomer(Auth::guard('customer')->id())->count(),
            ]]);

    }

    public function show(Company $company, $id)
    {
        $protectionPlanWarranty = $company->protectionPlanWarranties()
            ->whereCustomer(Auth::guard('customer')->id())
            ->where('id', $id)
            ->first();

        if(!$protectionPlanWarranty) {
            return response()->json(['error' => 'protectionPlanWarranty_not_found'], 404);
        }

        return new ProtectionPlanWarrantyResource($protectionPlanWarranty);
    }
}