<?php

namespace Crater\Policies;

use Crater\Models\Plain;
use Crater\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Silber\Bouncer\BouncerFacade;

class PlainPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \Crater\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        if (BouncerFacade::can('view-plain', Plain::class)) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \Crater\Models\User  $user
     * @param  \Crater\Models\Plain  $plain
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Plain $plain)
    {
        if (BouncerFacade::can('view-plain', $plain) && $user->hasCompany($plain->company_id)) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \Crater\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        if (BouncerFacade::can('create-plain', Plain::class)) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \Crater\Models\User  $user
     * @param  \Crater\Models\Plain  $plain
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Plain $plain)
    {
        if (BouncerFacade::can('edit-plain', $plain) && $user->hasCompany($plain->company_id)) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \Crater\Models\User  $user
     * @param  \Crater\Models\Plain  $plain
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Plain $plain)
    {
        if (BouncerFacade::can('delete-plain', $plain) && $user->hasCompany($plain->company_id)) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \Crater\Models\User  $user
     * @param  \Crater\Models\Plain  $plain
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Plain $plain)
    {
        if (BouncerFacade::can('delete-plain', $plain) && $user->hasCompany($plain->company_id)) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \Crater\Models\User  $user
     * @param  \Crater\Models\Plain  $plain
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Plain $plain)
    {
        if (BouncerFacade::can('delete-plain', $plain) && $user->hasCompany($plain->company_id)) {
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
        if (BouncerFacade::can('delete-plain', Plain::class)) {
            return true;
        }

        return false;
    }
}
