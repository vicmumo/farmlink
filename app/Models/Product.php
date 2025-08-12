<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function farm() {
        return $this->belongsTo(Farm::class);
    }

    public function orderItems() {
        return $this->hasMany(OrderItem::class);
    }
}
