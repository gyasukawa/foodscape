class Picture < ActiveRecord::Base
  belongs_to :foodscape

  has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  def as_json(options={})
    super(options).merge image_url: image.url
  end

end
