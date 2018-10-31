class ApplicationsController < ApplicationController
  def new
    @application = Application.new
  end

  def create
    @application = Application.new(application_params)
    authorize @application, policy_class: AppPolicy #only an RA can create an application
    if @application.save
      ApplicationsMailer.with(application: @application).new_application.deliver_now
      redirect_to tenant_path(@application.info.tenant)
    else
      render json: { errors: @application.errors.messages }
    end
  end

  def show
    @application = Application.find(params[:id])
    @info = @application.info
    @application_tenant = @info.tenant
    authorize @application, policy_class: AppPolicy #need to verify that the application belongs to the landlord's property OR RA
    @property = @application.property
  end

  def index   
    # should be passed in a Tenant ID and need to verify that the Tenant belongs to the current user
    @tenant = Tenant.find(params[:tenant_id])
    authorize @tenant, policy_class: TenantPolicy                          
    @applications = @tenant.applications #do I still need to authorize?
  end

  def edit
    @application = Application.find(params[:id])
    authorize @application, policy_class: AppPolicy
  end 

  def update
    # RA can update general information
    @application = Application.find(params[:id])
    authorize @application, policy_class: AppPolicy
    if @application.update_attributes(application_params)
      redirect_to applications_path
    else
    render json: { errors: @application.errors.messages }
    end
    # landlord can only update the status of an application
  end

  def update_status
    #only for landlord!
    @application = Application.find(params[:id])
    authorize @application, policy_class: AppPolicy
  end 

  def destroy
    application = Application.find(params[:id])
    if application.destroy
      redirect_to applications_path
    else
      render json: { errors: application.errors.messages }
    end
  end

  private
    
  def application_params
    params.require(:application).permit(policy(@application).permitted_attributes)
  end
end
