<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrdersRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'cartItems' => ['required', 'array'],
            'user_id' => ['required', 'integer'],
            'longitude' => ['required', 'numeric'],
            'latitude' => ['required', 'numeric'],
            'city' => ['required', 'string'],
            'state' => ['required', 'string'],
        ];
    }
}
