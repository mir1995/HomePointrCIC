class ReferralAgenciesController < ApplicationController
  def create
  	referral_agency = ReferralAgency.new(referral_agency_params)
  	if referral_agency.save!
  	  redirect_to referral_agencies_show_url
    else
      render json: { errors: referral_agency.errors.messages }
    end
  end

  def show
  	if user_signed_in? and current_user.type == 'ReferralAgency'
  	  @referral_agency = current_user
  	  @tenants = @referral_agency.tenants
    else
      redirect_to '/users/sign_up'
  	end
  end

  def update
  	# if params[:id] == current_user.id
	  @referral_agency = ReferralAgency.find(params[:id])
    if @referral_agency.update(referral_agency)
	    redirect_to referral_agencies_show_url
    else
      render json: { errors: @referral_agency.errors.messages }
    end 
    # else
    #   puts('you do not have access to this page')
  	# end
  end

  def destroy
    # if params[:id] == current_user.id
  	@referral_agency = ReferralAgency.find(params[:id])
    @referral_agency.destroy!
  	if @referral_agency.destroyed?
      redirect_to new_user_registration_path
    else
      render json: { errors: @referral_agency.errors.messages }
    end
    # else 
      #puts('you do not have access to this page')
    #end
  end

  private

  def referral_agency_params
    params.require(:referral_agency).permit(:email, :password, :name, :address, :phone)
  end

end