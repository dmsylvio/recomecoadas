<?php

namespace Crater\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NotationRequest extends FormRequest
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
            'customer_id' => [
                'required',
            ],
            'note' => [
                'required'
            ],
            'note_date' => [
                'required'
            ]
        ];
    }
}
