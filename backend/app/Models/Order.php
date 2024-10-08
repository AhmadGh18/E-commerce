<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable=["user_id","longitude","latitude","total_price","state","city"];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orderedItems()
    {
        return $this->hasMany(Order_Item::class);
    }
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}