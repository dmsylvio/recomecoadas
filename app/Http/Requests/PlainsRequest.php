<?php

namespace Crater\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlainsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'vin' => [
                'required',
            ],
            'make' => [
                'required',
            ],
            'model' => [
                'required',
            ],
            'employee_id' => [
                'required',
            ],
            'customer_id' => [
                'required',
            ],
            'notes' => [
                'nullable',
            ],
        ];
    }
}
