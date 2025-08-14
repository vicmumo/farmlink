<?php

// app/Models/Order.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'product_id',
        'farm_id',
        'quantity',
        'total_price',
        'status',
        'payment_status',
        'delivery_date',
        'notes',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function farm()
    {
        return $this->belongsTo(Farm::class);
    }
}
