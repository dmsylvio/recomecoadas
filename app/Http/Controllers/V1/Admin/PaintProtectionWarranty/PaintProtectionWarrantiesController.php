<?php

namespace Crater\Http\Controllers\V1\Admin\PaintProtectionWarranty;

use Crater\Http\Controllers\Controller;
use Crater\Http\Requests;
use Crater\Http\Requests\DeleteInvoiceRequest;
use Crater\Http\Resources\InvoiceResource;
use Crater\Jobs\GenerateInvoicePdfJob;
use Crater\Models\PaintProtectionWarranty;
use Illuminate\Http\Request;

class PaintProtectionWarrantiesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) 
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Requests\InvoicesRequest $request)
    {

    }

    /**
     * Display the specified resource.
     *
     * @param  \Crater\Models\PaintProtectionWarranty $paintProtectionWarranty
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request, PaintProtectionWarranty $paintProtectionWarranty)
    {
        $this->authorize('view', $PaintProtectionWarranty);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  PaintProtectionWarranty $paintProtectionWarranty
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Requests\InvoicesRequest $request, PaintProtectionWarranty $paintProtectionWarranty)
    {

    }

    /**
     * delete the specified resources in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(DeleteInvoiceRequest $request)
    {
        $this->authorize('delete multiple paintProtectionWarranties');

        PaintProtectionWarranty::deletePaintProtectionWarranties($request->ids);

        return response()->json([
            'success' => true,
        ]);
    }

}