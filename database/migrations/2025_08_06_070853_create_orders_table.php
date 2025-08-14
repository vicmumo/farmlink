<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('orders', function (Blueprint $table) {
        $table->id();

        // Relationships
        $table->foreignId('user_id')->constrained()->cascadeOnDelete(); // Consumer
        $table->foreignId('product_id')->constrained()->cascadeOnDelete();
        $table->foreignId('farm_id')->nullable()->constrained()->nullOnDelete(); // Optional for traceability

        // Order details
        $table->integer('quantity');
        $table->decimal('total_price', 10, 2);
        $table->enum('status', ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'])->default('pending');
        $table->enum('payment_status', ['unpaid', 'paid', 'refunded'])->default('unpaid');

        // Optional metadata
        $table->date('delivery_date')->nullable();
        $table->text('notes')->nullable();

        $table->timestamps();
});

    
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
