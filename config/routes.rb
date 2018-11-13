Rails.application.routes.draw do
  resources :referral_agencies, :only => [:create, :show, :update, :destroy]
  resources :landlords, :only => [:create, :show, :update, :destroy]
  resources :properties, :only => [:create, :update, :show, :destroy]
  resources :tenants, :only => [:create, :update, :show, :destroy]
  resources :applications, :only => [:create, :show, :destroy]
  resources :infos, :only => [:create]
  devise_for :users
  devise_scope :user do
#   authenticated :user do
#     root 'home#index', as: :authenticated_root
#   end

#   unauthenticated do
#     root 'devise/sessions#new', as: :unauthenticated_root
#   end
 end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
