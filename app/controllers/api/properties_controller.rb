class Api::PropertiesController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :set_page

  def index
    properties = Property.page(@page).per(50).available
    render json: { 
      properties: properties, 
      total_pages: properties.total_pages
    }
  end

  private
    def set_page
      @page = params[:page] || 1
    end

end
