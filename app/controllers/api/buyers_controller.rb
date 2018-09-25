class Api::BuyersController < ApplicationController
  skip_before_action :authenticate_user!
  
  def show
    buyer = Buyer.find(params[:id])
    render json: Buyer.my_homes(buyer.id, buyer.cities)
  end
end
