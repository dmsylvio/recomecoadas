<?php

namespace Crater\Policies;

use Crater\Models\Notation;
use Crater\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Silber\Bouncer\BouncerFacade;

class NotationPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \Crater\Models\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        if (BouncerFacade::can('view-notation', Notation::class)) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \Crater\Models\User  $user
     * @param  \Crater\Models\Notation  $notation
     * @return mixed
     */
    public function view(User $user, Notation $notation)
    {
        if (BouncerFacade::can('view-notation', $notation) && $user->hasCompany($notation->company_id)) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \Crater\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        if (BouncerFacade::can('create-notation', Notation::class)) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \Crater\Models\User  $user
     * @param  \Crater\Models\Notation  $notation
     * @return mixed
     */
    public function update(User $user, Notation $notation)
    {
        if (BouncerFacade::can('edit-notation', $notation) && $user->hasCompany($notation->company_id)) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \Crater\Models\User  $user
     * @param  \Crater\Models\Notation  $notation
     * @return mixed
     */
    public function delete(User $user, Notation $notation)
    {
        if (BouncerFacade::can('delete-notation', $notation) && $user->hasCompany($notation->company_id)) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \Crater\Models\User  $user
     * @param  \Crater\Models\Notation  $notation
     * @return mixed
     */
    public function restore(User $user, Notation $notation)
    {
        if (BouncerFacade::can('delete-notation', $notation) && $user->hasCompany($notation->company_id)) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \Crater\Models\User  $user
     * @param  \Crater\Models\Notation  $notation
     * @return mixed
     */
    public function forceDelete(User $user, Notation $notation)
    {
        if (BouncerFacade::can('delete-notation', $notation) && $user->hasCompany($notation->company_id)) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can delete models.
     *
     * @param  \Crater\Models\User  $user
     * @return mixed
     */
    public function deleteMultiple(User $user)
    {
        if (BouncerFacade::can('delete-notation', Notation::class)) {
            return true;
        }

        return false;
    }
}
