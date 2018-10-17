Rails.application.routes.draw do
  
  resources :properties, :only => [:create, :update, :show, :destroy]
  resources :tenants, :only => [:create, :update, :show, :destroy]
  resources :applications, :only => [:create, :show, :destroy]
  resources :infos, :only => [:create]
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
