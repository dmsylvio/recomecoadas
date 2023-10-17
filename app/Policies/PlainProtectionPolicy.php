<?php

namespace Crater\Policies;

use Crater\Models\PlainProtection;
use Crater\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Silber\Bouncer\BouncerFacade;

class PlainProtectionPolicy
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
        if (BouncerFacade::can('view-plain-protection', PlainProtection::class)) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \Crater\Models\User  $user
     * @param  \Crater\Models\PlainProtection  $plainProtection
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, PlainProtection $plainProtection)
    {
        if (BouncerFacade::can('view-plain-protection', $plainProtection) && $user->hasCompany($plainProtection->company_id)) {
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
        if (BouncerFacade::can('create-plain-protection', PlainProtection::class)) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \Crater\Models\User  $user
     * @param  \Crater\Models\PlainProtection  $plainProtection
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, PlainProtection $plainProtection)
    {
        if (BouncerFacade::can('edit-plain-protection', $plainProtection) && $user->hasCompany($plainProtection->company_id)) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \Crater\Models\User  $user
     * @param  \Crater\Models\PlainProtection  $plainProtection
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, PlainProtection $plainProtection)
    {
        if (BouncerFacade::can('delete-plain-protection', $plainProtection) && $user->hasCompany($plainProtection->company_id)) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \Crater\Models\User  $user
     * @param  \Crater\Models\PlainProtection  $plainProtection
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, PlainProtection $plainProtection)
    {
        if (BouncerFacade::can('delete-plain-protection', $plainProtection) && $user->hasCompany($plainProtection->company_id)) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \Crater\Models\User  $user
     * @param  \Crater\Models\PlainProtection  $plainProtection
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, PlainProtection $plainProtection)
    {
        if (BouncerFacade::can('delete-plain-protection', $plainProtection) && $user->hasCompany($plainProtection->company_id)) {
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
        if (BouncerFacade::can('delete-plain-protection', PlainProtection::class)) {
            return true;
        }

        return false;
    }
}
