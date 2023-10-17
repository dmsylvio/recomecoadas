<?php

namespace Crater\Http\Controllers\V1\Admin\Notation;

use Crater\Http\Controllers\Controller;
use Crater\Http\Requests;
use Crater\Http\Requests\DeleteNotationsRequest;
use Crater\Http\Resources\NotationResource;
use Crater\Models\Notation;
use Illuminate\Http\Request;

class NotationsController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Notation::class);

        $limit = $request->has('limit') ? $request->limit : 20;

        $notations = Notation::whereCompany()
            ->WhereRole($request->role)
            ->applyFilters($request->all())
            ->latest()
            ->paginateData($limit);

        return (NotationResource::collection($notations))
            ->additional(['meta' => [
                'notation_total_count' => Notation::whereCompany()->count(),
            ]]);
    }

    public function store(Requests\NotationRequest $request)
    {
        $this->authorize('create', Notation::class);

        $notation = Notation::createNotation($request);

        return new NotationResource($notation);
    }

    public function show(Notation $notation)
    {
        $this->authorize('view', $notation);

        return new NotationResource($notation);
    }

    public function update(Requests\NotationRequest $request, Notation $notation)
    {
        $this->authorize('update', $notation);

        $notation = $notation->updateNotation($request);

        return new NotationResource($notation);
    }

    public function delete(DeleteNotationsRequest $request)
    {
        $this->authorize('delete multiple notations');

        Notation::destroy($request->ids);

        return response()->json([
            'success' => true,
        ]);
    }
}
