<!DOCTYPE html>
<html>

<head>
    <title>@lang('pdf_paintProtectionWarranty_label') - {{ $paintProtectionWarranty->vin }}</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <style type="text/css">
        /* -- Base -- */
        body {
          font-family: "DejaVu Sans";
          font-size: 13px;
        }

        html {
          margin: 5px;
          padding: 0px;
        }

        .linha-com-padding {
          border: 2px solid #000;
          padding: 10px;
        }

        .container {
          border: 2px solid black;
          padding: 5px;
          max-width: 100%;
          box-sizing: border-box;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        td {
          vertical-align: top;
          padding: 5px;
          border-bottom: 1px solid #000;
        }

        .width-16 {
          width: 16.667%;
        }

        .width-25 {
          width: 25%;
        }

        .width-35 {
          width: 35%;
          float: left;
        }

        .width-50 {
          width: 50%;
          float: left;
        }

        .width-60 {
          width: 60%;
        }

        .width-75 {
          width: 75%;
        }

        .width-100 {
          width: 100%;
        }

        .width-1001::after {
          content: "";
          clear: both;
          display: table;
        }

        .margin-top25{
          margin-top: 25px;
        }

        .text{
          padding-left: 60px;
          padding-right: 60px;
        }

        .logo{
          width: 100%;
        }
    </style>

    @if (App::isLocale('th'))
        @include('app.pdf.locale.th')
    @endif
</head>

<body>
  <div class="linha-com-padding">
    <div class="logo">
      @if ($logo)
        <img style="height: 50px;" class="header-logo" src="{{ $logo }}" alt="Company Logo">
      @endif
    </div>
    
    <div class="width-1001"> 
      <div class="width-50">
        <h2>Scratch Repair Protection</h2>
      </div>
      <div class="width-50" style="text-align: right; margin-right: 50px">
        <a href="tel:+1>6172028857" style="color: black; text-decoration:none; font-size: 22px; font-weight: 600">617-202-8857</a><br>
        <a href="mailto:dentandscratchreapair@gmail.com" style="color: black; text-decoration:none">dentandscratchreapair@gmail.com</a><br>
        144 Pleasant st. - Methueh MA 01844
      </div>
    </div>

    <div class="container">
      <table>
        <tr>
          <td class="width-50">VEHICLE SALE DATE: {{ isset($paintProtectionWarranty->formatted_vehicle_sale_date) ? $paintProtectionWarranty->formatted_vehicle_sale_date : 'N/A' }}</td>
          <td class="width-50" colspan="4">VIN: {{ isset($paintProtectionWarranty->vin) ? $paintProtectionWarranty->vin : 'N/A' }}</td>
        </tr>
        <tr>
          <td class="width-50">VEHICLE YEAR: {{ isset($paintProtectionWarranty->vehicle_year) ? $paintProtectionWarranty->vehicle_year : 'N/A' }}</td>
          <td class="width-16">MAKE: {{ isset($paintProtectionWarranty->make) ? $paintProtectionWarranty->make : 'N/A' }}</td>
          <td class="width-16">MODEL: {{ isset($paintProtectionWarranty->model) ? $paintProtectionWarranty->model : 'N/A' }}</td>
          <td class="width-16">MILEAGE: {{ isset($paintProtectionWarranty->mileage) ? $paintProtectionWarranty->mileage : 'N/A' }}</td>
        </tr>
        <tr>
          <td class="width-50">VEHICLE PRICE: {{ isset($paintProtectionWarranty->vehicle_price) ? '$'. $paintProtectionWarranty->vehicle_price : 'N/A' }}</td>
          <td class="width-50" colspan="4">CONTRACT PRICE: {{ isset($paintProtectionWarranty->contract_price) ? '$'. $paintProtectionWarranty->contract_price : 'N/A' }}</td>
        </tr>
      </table>
    </div>

    <div class="container margin-top25">
      <table>
        <tr>
          <td class="width-50">OWNER NAME: {{ isset($paintProtectionWarranty->owner_name) ? $paintProtectionWarranty->owner_name : 'N/A' }}</td>
          <td class="width-50" colspan="3">ADDRESS: {{ isset($paintProtectionWarranty->owner_address) ? $paintProtectionWarranty->owner_address : 'N/A' }}</td>
        </tr>
        <tr>
          <td class="width-50">PRIMARY PHONE: {{ isset($paintProtectionWarranty->owner_primary_phone) ? $paintProtectionWarranty->owner_primary_phone : 'N/A' }}</td>
          <td class="width-50" colspan="3">CITY: {{ isset($paintProtectionWarranty->owner_city) ? $paintProtectionWarranty->owner_city : 'N/A' }}</td>
        </tr>
        <tr>
          <td class="width-50">STATE: {{ isset($paintProtectionWarranty->owner_state) ? $paintProtectionWarranty->owner_state : 'N/A' }}</td>
          <td class="width-50">ZIP: {{ isset($paintProtectionWarranty->owner_zip) ? $paintProtectionWarranty->owner_zip : 'N/A' }}</td>
        </tr>
      </table>
    </div>

    <div class="container margin-top25">
      <table>
        <tr>
          <td class="width-50">DEALER NAME: {{ isset($paintProtectionWarranty->dealer_name) ? $paintProtectionWarranty->dealer_name : 'N/A' }}</td>
          <td class="width-50">LIEN HOLDER: {{ isset($paintProtectionWarranty->dealer_lien_holder) ? $paintProtectionWarranty->dealer_lien_holder : 'N/A' }}</td>
        </tr>
        <tr>
          <td class="width-50">PRIMARY PHONE: {{ isset($paintProtectionWarranty->dealer_primary_phone) ? $paintProtectionWarranty->dealer_primary_phone : 'N/A' }}</td>
          <td class="width-50">PHONE: {{ isset($paintProtectionWarranty->dealer_phone) ? $paintProtectionWarranty->dealer_phone : 'N/A' }}</td>
        </tr>
        <tr>
          <td class="width-50">ADDRESS: {{ isset($paintProtectionWarranty->dealer_address) ? $paintProtectionWarranty->dealer_address : 'N/A' }}</td>
          <td class="width-50">CITY: {{ isset($paintProtectionWarranty->dealer_city) ? $paintProtectionWarranty->dealer_city : 'N/A' }}</td>
        </tr>
        <tr>
          <td class="width-50">STATE: {{ isset($paintProtectionWarranty->dealer_state) ? $paintProtectionWarranty->dealer_state : 'N/A' }}</td>
          <td class="width-50">ZIP: {{ isset($paintProtectionWarranty->dealer_zip) ? $paintProtectionWarranty->dealer_zip : 'N/A' }}</td>
        </tr>
      </table>
    </div>


    

    <div class="container margin-top25">
      <span>I have read and fully understood the terms of this contract. I undersand this agreement is not required in order to purchase or obtain financing of a motor vehicle. </span>
      <table>
        <tr>
          <td class="width-75">CUSTOMER SIGNATURE: {{ isset($paintProtectionWarranty->owner_name) ? $paintProtectionWarranty->owner_name : 'N/A' }}</td>
          <td class="width-25">DATE: {{ isset($paintProtectionWarranty->formatted_created_at) ? $paintProtectionWarranty->formatted_created_at : 'N/A' }}</td>
        </tr>
      </table>
    </div>
  </div>

  <div class="text">
    <h4 style="text-decoration: underline">DEFINITIONS</h4>
    <ul>
      <li><strong>Contract:</strong> means Scratch Repair Protection Contract –Protection Plan and/or Wheels - Rims. Wheel rims repair package is not included in Paint protection Scratch Repair, you must buy separately.</li>
      <li><strong>Administrator, Debtor, Dent and Scratch Repair Corp.:</strong> Paint Protection Scratch Repair, at 144 Pleasant St Methuen MA 01844, Phone Number +1 (617) 202 - 8857 - info@autoaestheticsusa.com.</li>
      <li><strong>Buyer, Contract Holder, You or Yours:</strong> means the recipient of this Contract listed in the Buyer Information section of this Contract, or a qualified transferee (see section "Transfer").</li>
      <li><strong>Vehicle:</strong> means the automobile for which this Contract was purchased, as described in the Vehicle Information section of this Contract.</li>
      <li><strong>Covered Repair:</strong> means a repair benefit as defined in this Contract that is not excluded under the "Coverage" or "Additional Exclusion" sections of this Contract.</li>
      <li><strong>Effective date:</strong> means the start date of coverage under this Contract.</li>
      <li><strong>Seller:</strong> means the retail facility where You purchased Your Contract.</li>
    </ul>
    <h4 style="text-decoration: underline">COVERAGE</h4>
    <p>The following is the list of benefits contained in this Contract. See the "Additional Exclusions" section below for detailed explanations of specific benefits and exclusions. </p>
    <h4 style="text-decoration: underline">SCRATCH REPAIR PROTECTION - PAINT PROTECTION</h4>
    <p>This Contract provides coverage for a Covered Repair using Scratch Repair – Paint Protection methods: our process targets different types of surface level damage such as scratches and spider web scuffs as well as swirl mark and clear coat fog. </p>
    <ul>
      <li>We repair scratches up to 7 inches long per panel, vertical or horizontal</li>
      <li>Scratch depth must be no more than 0.20 mm clear coat.</li>
    </ul>
    <h4 style="text-decoration: underline">RIMS SCRATCH REPAIR PROTECTION - WHEELS-RIMS</h4>
    <ul>
      <li>Wheels Painting</li>
      <li>Wheels Refinishing</li>
      <li>Wheels Straightening</li>
    </ul>
    <p>We cover scratches up to 3 inches; vertical, horizontal, scratch depth has to be up to 7 limeters (mm)</p>
    <h4 style="text-decoration: underline">ADDITIO!AL EXCLUSIONS</h4>
    <strong>Your Contract does not cover:</strong>
    <ul>
      <li>Bumpers and mirrors</li>
      <li>If it exceeded the varnish and damaged the paint, we do not fix it.</li>
      <li>If the ink is damaged or broken, we do not fix it.</li>
      <li>We do not use any type of spray paint.</li>
      <li>We do not do any Body shop work.</li>
      <li>Damage caused by modifications made that are not recommended by the Vehicle.</li>
      <li>Manufacturer, unless the modifications are performed by an Authorized Dealer or the Vehicle Manufacturer.</li>
      <li>Damage due to manufacturing defects.</li>
      <li>Chrome, bumpers, grilles, glass, plastic or other non-metallic exterior sections of the vehicle body.</li>
      <li>Exterior surfaces that have a matte finish, finish film or wrap applied.</li>
      <li>Damage that existed on the Vehicle at the time this Contract was purchased.</li>
    </ul>
    <h4 style="text-decoration: underline">CLAIM PROCEDURES</h4>
    <span>- Claim Procedure: Prior authorization is required for all claims.</span><br>
    <span>To arrange for service under this coverage, you must first call the dealership to determine if your repair is covered under this Contract.</span><br>
    <span>You will be asked to take Your Vehicle to the dealership for repair.</span><br>
    <span>Only services provided through the above procedures are eligible for coverage.</span>
    <h4 style="text-decoration: underline">LIMITS OF LIABILITY</h4>
    <span>Terms</span><br>
    <span>The Term of this Contract is calculated from the Effective Date and is based upon the Term selected by You on the registration page of this Contract. If the Contract Term is not stated on the front of this Contract, the Term shall be the maximum of thirty-six (36) months from the date of Contract purchase. This Contract is not renewable.</span>
    <h4 style="text-decoration: underline">REQUIREMENTS FOR THIS WARRANTY TO BE EFFECTIVE: DENT AND SCRATCH REPAIR</h4>
    <span>must receive the proper warranty record from Dealer within thirty (30) days after the date you purchase the Product from Dealer.</span>
    <h4 style="text-decoration: underline">CANCELLATION</h4>
    <span>This Contract may be canceled by You at any time with written notification. You may notify the Seller indicated on the Registration page of this Contract. Any refund due will occur within thirty (30) days of receipt of written cancellation notice.</span>
    <h4 style="text-decoration: underline">TRANSFER</h4>
    <span>This Contract may not be transferred by You to a subsequent private purchaser of the Vehicle for the remainder of the original term. This Contract is not transferable to another vehicle.</span>
    <h4 style="text-decoration: underline">OTHER IMPORTANT CONTRACT INFORMATION</h4>
    <span>THIS CONTRACT IS NOT AN INSURANCE POLICY AND IS NOT SUBJECT TO STATE INSURANCE LAWS. IT IS A CONTRACT BETWEEN YOU FOR CERTAIN COVERED REPAIRS FOR THE COVERAGE PURCHASED. YOU SHOULD OBTAIN YOUR OWN INSURANCE FOR DAMAGE TO YOUR VEHICLE, INCLUDING DAMAGES THAT MAY BE COVERED BY THIS CONTRACT. THIS CONTRACT MAY BE SUBJECT TO DECLARATION CONCERNING WARRANTIES OR SERVICE CONTRACTS</span>
    <h4 style="text-decoration: underline">DISPUTE RESOLUTION</h4>
    <span>The following does not apply to sales of this Contract in states where otherwise prohibited by applicable law: Any dispute arising out of or relating to this Contract, whether in contract, tort, statute, regulation, ordinance, in equity or otherwise and whether Your dispute is with the Administrator, Debtor, Provider or Selling Store shall be finally resolved by arbitration in accordance with the International Institute for Conflict Prevention and Resolution Rules for NonAdministered Arbitration ("CPR Rules") by a sole arbitrator. To initiate arbitration, You must notify Administrator in writing of Your desire to submit Your issue to arbitration. In accordance with the CPR Rules, You and the Administrator will first attempt to agree on a sole, neutral arbitrator. The arbitration shall be governed by the Federal Arbitration Act, 9 U.S.C. §§ 1 et seq., and judgment upon the award rendered by the arbitrator(s) may be entered by any court having jurisdiction over this contract.</span>
    <h4 style="text-decoration: underline">STATE REQUIREMENTS AND DISCLOSURES</h4>
    <span>Some states in which this Contract is sold require certain additional disclosures or require amendments to the terms and conditions above. THIS CONTRACT IS AMENDED TO MEET THE FOLLOWING STATE REQUIREMENTS AND DISCLOSURES. They apply to You if You purchased this Contract in the following states: MASSACHUSETTS- The Other Important Information section of the Contract is amended as follows: "Seller is the obligated party to this Contract. If Seller or Administrator is unable to provide the benefits described in this Service Contract, the Underwriting Insurer is obligated to provide such benefits." NOTICE TO BUYER: THE PURCHASE OF THIS CONTRACT IS NOT NECESSARY TO REGISTER OR FUND YOUR VEHICLE. THE BENEFITS PROVIDED MAY DUPLICATE THE MANUFACTURER'S OR SELLER'S EXPRESS WARRANTIES THAT COME AUTOMATICALLY WITH EACH SALE. THE SELLER OF THIS COVERAGE IS OBLIGED TO INFORM YOU OF ANY WARRANTIES AVAILABLE TO YOU WITHOUT THIS CONTRACT.</span>
  </div>
</body>
</html>