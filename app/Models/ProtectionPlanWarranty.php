<?php

namespace Crater\Models;

use Carbon\Carbon;
use DB;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;

class ProtectionPlanWarranty extends Model
{
    use HasFactory;

    protected $table = 'paint_protections_warranties';

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $guarded = ['id'];

    protected $appends = [
        'formattedCreatedAt',
    ];
     
    public function scopeWhereSearch($query, $search){}

    public function scopeWhereOrder($query, $orderByField, $orderBy){}

    public function scopeApplyFilters($query, array $filters)
    {
        $filters = collect($filters);

        if ($filters->get('search')) {
            $query->whereSearch($filters->get('search'));
        }

        if ($filters->get('orderByField') || $filters->get('orderBy')) {
            $field = $filters->get('orderByField') ? $filters->get('orderByField') : 'name';
            $orderBy = $filters->get('orderBy') ? $filters->get('orderBy') : 'asc';
            $query->whereOrder($field, $orderBy);
        }
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
        $dateFormat = CompanySetting::getSetting('carbon_date_format', request()->header('company'));

        return Carbon::parse($this->created_at)->format($dateFormat);
    }

    public function scopeWhereCompany($query)
    {
        return $query->where('paint_protections_warranties.company_id', request()->header('company'));
    }

    public function scopeWhereCustomer($query, $customer_id)
    {
        $query->where('paint_protections_warranties.customer_id', $customer_id);
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

    public static function createProtectionPlanWarranty($request)
    {
        $data = $request->validated();
        $data['company_id'] = request()->header('company');
        $data['creator_id'] = Auth::id();

        return self::create($data);

    }

    public function updateProtectionPlanWarranty($request)
    {
        $this->update($request->validated());

        return ProtectionPlanWarranty::find($this->id);
    }
}