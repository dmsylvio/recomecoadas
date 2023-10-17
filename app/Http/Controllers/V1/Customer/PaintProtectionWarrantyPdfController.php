<?php

namespace Crater\Http\Controllers\V1\Customer;

use Crater\Http\Controllers\Controller;
use Crater\Http\Resources\PaintProtectionWarrantyResource;
use Crater\Models\EmailLog;
use Crater\Models\PaintProtectionWarranty;
use Illuminate\Http\Request;

class PaintProtectionWarrantyPdfController extends Controller
{
  public function getPdf(EmailLog $emailLog, Request $request)
  {
    $paintProtectionWarranty = PaintProtectionWarranty::find($emailLog->mailable_id);

    if (! $emailLog->isExpired()) {
      // return $emailLog->mailable->getGeneratedPDFOrStream('paintProtectionWarranty');

      if ($request->has('pdf')) {
        return $paintProtectionWarranty->getGeneratedPDFOrStream('paintProtectionWarranty');
      }

      return view('app')->with([
        'customer_logo' => get_company_setting('customer_portal_logo', $paintProtectionWarranty->company_id),
        'current_theme' => get_company_setting('customer_portal_theme', $paintProtectionWarranty->company_id)
      ]);
    }
    
    abort(403, 'Link Expired.');
  }
  
  public function getPaintProtectionWarranty(EmailLog $emailLog)
  {
    $paintProtectionWarranty = PaintProtectionWarranty::find($emailLog->mailable_id);
    
    return new PaintProtectionWarrantyResource($paintProtectionWarranty);
  }
}