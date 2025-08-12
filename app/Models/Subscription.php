<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    // Relationships
    public function user() {
        return $this->belongsTo(User::class);
    }

}
