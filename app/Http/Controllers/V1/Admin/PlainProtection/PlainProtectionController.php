<?php

namespace Crater\Http\Controllers\V1\Admin\PlainProtection;

use Crater\Http\Controllers\Controller;
use Crater\Http\Requests;
use Crater\Http\Requests\DeletePlainsRequest;
use Crater\Http\Resources\PlainResource;
use Crater\Models\PlainProtection;
use Illuminate\Http\Request;

class PlainProtectionController extends Controller
{
    /**
     * Retrieve a list of existing Items.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', PlainProtection::class);

        $limit = $request->has('limit') ? $request->limit : 10;

        $plains = PlainProtection::whereCompany()
            ->applyFilters($request->all())
            ->latest()
            ->paginateData($limit);

        return (PlainResource::collection($plains))
            ->additional(["meta" => [
                "plain_total_count" => PlainProtection::whereCompany()->count(),
            ]]);


        // return (PlainResource::collection($plains))
        //     ->additional(['meta' => [
        //         'plain_total_count' => PlainProtection::whereCompany()->count(),
        //     ]]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePlainProtectionRequest  $request
     * @return \Illuminate\Http\Response
     */
    // public function store(StorePlainProtectionRequest $request)
    public function store(Requests\PlainsRequest $request)
    {
        $this->authorize('create', PlainProtection::class);

        $plain = PlainProtection::createPlainProtection($request);

        return new PlainResource($plain);
    }

    /**
     * get an existing Plain Protections.
     *
     * @param  PlainProtection $plainProtection
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(PlainProtection $plainProtection)
    {
        $this->authorize('view', $plainProtection);

        return new PlainResource($plainProtection);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePlainProtectionRequest  $request
     * @param  \Crater\Models\PlainProtection  $plainProtection
     * @return \Illuminate\Http\Response
     */
    public function update(Requests\PlainsRequest $request, PlainProtection $plainProtection)
    {
        $this->authorize('update', $plainProtection);

        $plain = PlainProtection::find($request['id']);

        $plain->update($request->all());

        return response()->json([
            'success' => true,
        ]);
    }


    /**
     * Delete a list of existing Plain Protections.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(DeletePlainsRequest $request)
    {
        $this->authorize('delete multiple plains');

        PlainProtection::destroy($request->ids);

        return response()->json([
            'success' => true,
        ]);
    }
}
