<?php

namespace Crater\Http\Controllers\V1\Admin\Plain;

use Crater\Http\Controllers\Controller;
use Crater\Http\Requests;
use Crater\Http\Requests\DeletePlainsRequest;
use Crater\Http\Resources\PlainsResource;
use Crater\Models\Plain;
use Illuminate\Http\Request;

class PlainsController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Plain::class);

        $limit = $request->has('limit') ? $request->limit : 10;

        $plains = Plain::whereCompany()
            ->applyFilters($request->all())
            ->latest()
            ->paginateData($limit);

        return (PlainsResource::collection($plains))
            ->additional(['meta' => [
                'plain_total_count' => Plain::whereCompany()->count(),
            ]]);
    }



    public function store(Requests\PlainsRequest $request)
    {
        $this->authorize('create', Plain::class);

        $plain = Plain::createPlain($request);

        return new PlainsResource($plain);
    }

    public function show(Plain $plain)
    {
        $this->authorize('view', $plain);

        return new PlainsResource($plain);
    }

    public function update(Requests\PlainsRequest $request, Plain $plain)
    {
        $this->authorize('update', $plain);

        $plain = $plain->updatePlain($request);

        return new PlainsResource($plain);
    }

    public function delete(DeletePlainsRequest $request)
    {
        $this->authorize('delete multiple plains');

        Plain::destroy($request->ids);

        return response()->json([
            'success' => true,
        ]);
    }
}
