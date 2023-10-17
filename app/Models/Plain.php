<?php

namespace Crater\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Plain extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $appends = [
        'formattedCreatedAt',
        'formattedDueDate'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function employee()
    {
        return $this->belongsTo(User::class, 'employee_id');
    }

    public function scopeApplyFilters($query, array $filters)
    {
        $filters = collect($filters);

        if ($filters->get('due_date')) {
            $query->WhereDueDate($filters->get('due_date'));
        }

        if ($filters->get('vin')) {
            $query->WhereVin($filters->get('vin'));
        }

        if ($filters->get('make')) {
            $query->WhereMake($filters->get('make'));
        }

        if ($filters->get('model')) {
            $query->WhereModel($filters->get('model'));
        }

        if ($filters->get('employee_id')) {
            $query->WhereEmployee($filters->get('employee_id'));
        }

        if ($filters->get('customer_id')) {
            $query->WhereCustomer($filters->get('customer_id'));
        }
    }

    public function scopeWhereDueDate($query, $due_date)
    {
        return $query->where('due_date', $due_date);
    }

    public function scopeWhereVin($query, $vin)
    {
        return $query->where('vin', $vin);
    }

    public function scopeWhereMake($query, $make)
    {
        return $query->where('make', $make);
    }

    public function scopeWhereModel($query, $model)
    {
        return $query->where('model', $model);
    }

    public function scopeWhereEmployee($query, $employee_id)
    {
        return $query->where('employee_id', $employee_id);
    }

    public function scopeWhereCustomer($query, $customer_id)
    {
        return $query->where('customer_id', $customer_id);
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


    public function getFormattedDueDateAttribute($value)
    {
        $dateFormat = CompanySetting::getSetting('carbon_date_format', request()->header('company'));

        return Carbon::parse($this->due_date)->format($dateFormat);
    }

    public function scopeWhereCompany($query)
    {
        $query->where('plains.company_id', request()->header('company'));
    }

    // CreateNotation
    public static function CreatePlain($request)
    {
        $data = $request->validated();
        $data['company_id'] = $request->header('company');
        $data['creator_id'] = Auth::id();

        $plain = self::create($data);

        $plain = self::find($plain->id);

        return $plain;
    }

    // UpdateNotation
    public function updatePlain($request)
    {
        $this->update($request->validated());

        return Plain::find($this->id);
    }
}
