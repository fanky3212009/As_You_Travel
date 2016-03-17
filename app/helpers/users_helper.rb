module UsersHelper

  def filter_string(content)
    raw_content = raw content
    output_content = raw_content[/\A"(.*)"\z/m,1]
    output_content
  end
end
