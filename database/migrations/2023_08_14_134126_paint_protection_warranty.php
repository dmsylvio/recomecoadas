<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PaintProtectionWarranty extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('paint_protection_warranties', function (Blueprint $table) {
            $table->id();
            $table->date('vehicle_sale_date')->nullable();
            $table->string('vin')->nullable();
            $table->year('vehicle_year')->nullable();
            $table->string('make')->nullable();
            $table->string('model')->nullable();
            $table->integer('mileage')->nullable();
            $table->decimal('vehicle_price', 8, 2)->nullable();
            $table->decimal('contract_price', 8, 2)->nullable();
            // Campos relacionados ao Owner
            $table->string('owner_name')->nullable();
            $table->string('owner_address')->nullable();
            $table->string('owner_primary_phone')->nullable();
            $table->string('owner_city')->nullable();
            $table->string('owner_state')->nullable();
            $table->string('owner_zip')->nullable();
            // Campos relacionados ao Dealer
            $table->string('dealer_name')->nullable();
            $table->string('dealer_lien_holder')->nullable();
            $table->string('dealer_primary_phone')->nullable();
            $table->string('dealer_phone')->nullable();
            $table->string('dealer_address')->nullable();
            $table->string('dealer_city')->nullable();
            $table->string('dealer_state')->nullable();
            $table->string('dealer_zip')->nullable();
            // Requisitar exclusao
            $table->boolean('request_deletion')->default(false);
            $table->unsignedBigInteger('customer_id')->nullable();
            $table->foreign('customer_id')->references('id')->on('customers');
            $table->integer('company_id')->unsigned()->nullable();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
            $table->unsignedInteger('creator_id')->nullable();
            $table->foreign('creator_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    } 

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('paint_protections_warranties');
    }
}