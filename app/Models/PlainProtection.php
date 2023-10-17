<?php

namespace Crater\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class PlainProtection extends Model
{
    use HasFactory;

    protected $dates = [
        'created_at',
        'updated_at'
    ];

    protected $guarded = ['id'];

    protected $appends = [
        'formattedCreatedAt',
    ];

    protected $casts = [
        'notes' => 'string'
    ];

    public function scopeApplyFilters($query, array $filters)
    {
        $filters = collect($filters);

        if ($filters->get('search')) {
            $query->whereSearch($filters->get('search'));
        }

        // if ($filters->get('vin')) {
        //     $query->whereVin($filters->get('vin'));
        // }
    }

    public function scopeWhereSearch($query, $search)
    {
        return $query->where('plain_protections.vin', 'LIKE', '%' . $search . '%');
    }




    public function scopePaginateData($query, $limit)
    {
        if ($limit == 'all') {
            return $query->get();
        }

        return $query->paginate($limit);
    }

    public function getFormattedCreatedAtAttribute($value)
    {
        $dateFormat = CompanySetting::getSetting('carbon_date_format', $this->company_id);

        return Carbon::parse($this->created_at)->format($dateFormat);
    }

    public function scopeWhereCompany($query)
    {
        $query->where('plain_protections.company_id', request()->header('company'));
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function creator()
    {
        return $this->belongsTo('Crater\Models\User', 'creator_id');
    }

    public static function createPlainProtection($request)
    {
        $data = $request->validated();
        $data['company_id'] = $request->header('company');
        $data['creator_id'] = Auth::id();

        $plain = self::create($data);

        return $plain;
    }

    public function updatePlainProtection($request)
    {
        return $this->update($request->validated());
    }
}
