<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;
    public function farm() {
        return $this->belongsTo(Farm::class);
    }

    public function orderItems() {
        return $this->hasMany(OrderItem::class);
    }

    public function linkedProducts()
    {
        return $this->belongsToMany(Product::class, 'linked_product_product', 'product_id', 'linked_product_id');
    }
    public function category()
    {
        return $this->belongsTo(ProductCategory::class);
    }

    protected $fillable = ['name', ];


}
