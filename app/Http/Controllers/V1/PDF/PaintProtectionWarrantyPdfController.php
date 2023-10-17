<?php

namespace Crater\Http\Controllers\V1\PDF;

use Crater\Http\Controllers\Controller;
use Crater\Models\PaintProtectionWarranty;
use Illuminate\Http\Request;

class PaintProtectionWarrantyPdfController  extends Controller
{
  /**
  * Handle the incoming request.
  *
  * @param  \Illuminate\Http\Request  $request
  * @return \Illuminate\Http\Response
  */
  public function __invoke(Request $request, PaintProtectionWarranty $paintProtectionWarranty)
  {
    if ($request->has('preview')) {
      return view('app.pdf.paint.paint');
    }
    
    return $paintProtectionWarranty->getGeneratedPDFOrStream('paintProtectionWarranty');
  }
}