<?php

namespace Crater\Models;

use App;
use Barryvdh\DomPDF\Facade as PDF;
use Carbon\Carbon;
use Crater\Services\SerialNumberFormatter;
use Crater\Traits\GeneratesPdfTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Vinkla\Hashids\Facades\Hashids;

class PaintProtectionWarranty extends Model
{
  use HasFactory;
  use GeneratesPdfTrait;

  protected $dates = [
    'created_at', 
    'updated_at',
    'vehicle_sale_date'
  ];
   
  protected $guarded = ['id'];
  
  protected $appends = [
    'formattedCreatedAt',
    'formattedVehicleSaleDate',
    'paintProtectionWarrantyPdfUrl'
  ];

  /**
   * Scope a query to filter by VIN.
   *
   * @param  \Illuminate\Database\Eloquent\Builder  $query
   * @param  string  $vin
   * @return \Illuminate\Database\Eloquent\Builder
   */
  public function scopeWhereVin($query, $vin)
  {
    // return $query->where('paint_protection_warranties.vin', $vin);
    // return $query->where('paint_protection_warranties.vin', 'LIKE', '%' . $vin . '%');
    return $query->where('paint_protection_warranties.vin', 'LIKE', "%{$vin}%");
    
  }

  /**
   * Scope a query to filter by vehicle sale date.
   *
   * @param  \Illuminate\Database\Eloquent\Builder  $query
   * @param  \Carbon\Carbon|string  $vehicle_sale_date
   * @return \Illuminate\Database\Eloquent\Builder
   */
  public function scopeWhereVehicleSaleDate($query, $vehicle_sale_date)
  {
    return $query->where('paint_protection_warranties.vehicle_sale_date', $vehicle_sale_date);
  }

  /**
   * Scope a query to filter by owner name.
   *
   * @param  \Illuminate\Database\Eloquent\Builder  $query
   * @param  string  $owner_name
   * @return \Illuminate\Database\Eloquent\Builder
   */
  public function scopeWhereOwnerName($query, $owner_name)
  {
    return $query->where('paint_protection_warranties.owner_name', 'LIKE', "%{$owner_name}%");
  }

  /**
   * Scope a query to filter by dealer name.
   *
   * @param  \Illuminate\Database\Eloquent\Builder  $query
   * @param  string  $dealer_name
   * @return \Illuminate\Database\Eloquent\Builder
   */
  public function scopeWhereDealerName($query, $dealer_name)
  {
    return $query->where('paint_protection_warranties.dealer_name', 'LIKE', "%{$dealer_name}%");
  }

  public function scopeOrderByField($query, $orderByField, $orderBy)
  {
    $query->orderBy($orderByField, $orderBy);
  }

  public function scopeApplyFilters($query, array $filters)
  {
    $filters = collect($filters);

    // Filter by VIN
    if ($filters->get('vin')) {
      $query->whereVin($filters->get('vin'));
    }

    // Filter by Vehicle Sale Date
    if ($filters->get('vehicle_sale_date')) {
      $query->whereVehicleSaleDate($filters->get('vehicle_sale_date'));
    }

    // Filter by Owner Name
    if ($filters->get('owner_name')) {
      $query->whereOwnerName($filters->get('owner_name'));
    }

    // Filter by Dealer Name
    if ($filters->get('dealer_name')) {
      $query->whereDealerName($filters->get('dealer_name'));
    }
    
    if ($filters->get('orderByField') || $filters->get('orderBy')) {
      $field = $filters->get('orderByField') ? $filters->get('orderByField') : 'dealer_name';
      $orderBy = $filters->get('orderBy') ? $filters->get('orderBy') : 'asc';
      $query->orderByField($field, $orderBy);
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
    $dateFormat = CompanySetting::getSetting('carbon_date_format', $this->company_id);
    if(!$this->company_id) {
      return null;
    }
    return Carbon::parse($this->created_at)->format($dateFormat);
  }


  public function getFormattedVehicleSaleDateAttribute($value)
  {
    $dateFormat = CompanySetting::getSetting('carbon_date_format', $this->company_id);
    if(!$this->company_id) {
      return null;
    }
    return Carbon::parse($this->vehicle_sale_date)->format($dateFormat); 
  }
   
  public function scopeWhereCompany($query)
  {
    if(!request()->hasHeader('company')) {
      return $query;
    }

    return $query->where('paint_protection_warranties.company_id', request()->header('company'));
  }
  
  public function scopeWhereCustomer($query, $customer_id)
  {
    $query->where('paint_protection_warranties.customer_id', $customer_id);
  }
  
  public function customer()
  {
    return $this->belongsTo(Customer::class, 'customer_id');
  }
  
  public function company()
  {
    return $this->belongsTo(Company::class);
  }

  public function getPaintProtectionWarrantyPdfUrlAttribute()
  {
    return url('/paint-protection-warranties/pdf/' . $this->unique_hash);
  }

  public function getPDFData()
  {
    $company = Company::find($this->company_id);
    $locale = CompanySetting::getSetting('language', 1);

    \App::setLocale($locale);

    $logo = $company->logo_path;

    view()->share([
      'paintProtectionWarranty' => $this,
      'logo' => $logo ?? null,
    ]);

    if (request()->has('preview')) {
      return view('app.pdf.paint.paint');
    }

    return PDF::loadView('app.pdf.paint.paint');
  }
}