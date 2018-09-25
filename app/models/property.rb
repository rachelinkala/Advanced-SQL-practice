class Property < ApplicationRecord
  belongs_to :agent
  has_one :address

  def self.available
    select('properties.id, price, beds, bath, sq_ft, 
            ad.city, ad.zip, ad.street,
            a.first_name, a.last_name, e.email, a.id AS agent.id')
    .joins('INNER JOIN agents a ON a.id = properties.agent_id
            INNER JOIN addresses ad ON ad.property_id = properties.id')
    .where('properties.sold <> TRUE')
    .order('a.id')
  end
end
