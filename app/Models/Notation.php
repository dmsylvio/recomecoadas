<?php

namespace Crater\Models;

use Carbon\Carbon;
use DB;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;

class Notation extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $appends = [
        'formattedCreatedAt',
        'formattedUpdatedAt',
        'formattedNoteDate'
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

        if ($filters->get('customer_id')) {
            $query->whereCustomer($filters->get('customer_id'));
        }

        if ($filters->get('note_date')) {
            $query->WhereCreatedAt($filters->get('note_date'));
        }

        if ($filters->get('note')) {
            $query->WhereNote($filters->get('note'));
        }
    }

    public function scopePaginateData($query, $limit)
    {
        if ($limit == 'all') {
            return $query->get();
        }

        return $query->paginate($limit);
    }

    public function getFormattedNoteDateAttribute($value)
    {
        $dateFormat = CompanySetting::getSetting('carbon_date_format', request()->header('company'));

        return Carbon::parse($this->note_date)->format($dateFormat);
    }

    public function getFormattedCreatedAtAttribute($value)
    {
        $dateFormat = CompanySetting::getSetting('carbon_date_format', request()->header('company'));

        return Carbon::parse($this->created_at)->format($dateFormat);
    }

    public function getFormattedUpdatedAtAttribute($value)
    {
        $dateFormat = CompanySetting::getSetting('carbon_date_format', request()->header('company'));

        return Carbon::parse($this->updated_at)->format($dateFormat);
    }

    public function scopeWhereCustomer($query, $customer_id)
    {
        return $query->where('customer_id', $customer_id);
    }

    public function scopeWhereCreatedAt($query, $note_date)
    {
        return $query->where('note_date', $note_date);
    }

    public function scopeWhereNote($query, $note)
    {
        return $query->where('note', 'LIKE', '%' . $note . '%');
    }

    public function scopeWhereRole($query, $role)
    {
        if ($role !== 'super admin') {
            return $query->where('notations.employee_id', Auth::user()->id);
        }
    }

    public function scopeWhereEmployee($query)
    {
        // if (Auth::user()->id !== 1) {
        return $query->where('notations.employee_id', Auth::user()->id);
        // }
    }

    public function scopeWhereCompany($query)
    {
        $query->where('notations.company_id', request()->header('company'));
    }


    // CreateNotation
    public static function CreateNotation($request)
    {
        $data = $request->validated();
        $data['company_id'] = $request->header('company');
        $data['employee_id'] = Auth::id();
        $data['creator_id'] = Auth::id();
        // $data['creator_id'] = 1;

        $notation = self::create($data);

        $notation = self::find($notation->id);

        return $notation;
    }

    // UpdateNotation
    public function updateNotation($request)
    {
        $this->update($request->validated());

        return Notation::find($this->id);
    }
}
