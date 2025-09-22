import os
import pandas as pd  # type: ignore
from PIL import Image  # type: ignore
from PIL.ExifTags import TAGS, GPSTAGS  # type: ignore

# Paths
image_folder = r"C:\Users\Sangeetha Sam\OneDrive\Desktop\classified"  # Change this
excel_file = r"C:\Users\Sangeetha Sam\OneDrive\Desktop\GREEN SURVEY.xlsx"  # Change this

# Function to extract GPS metadata
def get_gps_data(image_path):
    try:
        img = Image.open(image_path)
        exif_data = img._getexif()
        if not exif_data:
            return None, None, None, None  # No GPS data

        gps_info = {}
        for tag, value in exif_data.items():
            tag_name = TAGS.get(tag, tag)
            if tag_name == "GPSInfo":
                for key in value:
                    gps_info[GPSTAGS.get(key, key)] = value[key]

        # Extract latitude and longitude
        lat_dms, lon_dms, lat_dec, lon_dec = None, None, None, None
        lat_ref, lon_ref = gps_info.get("GPSLatitudeRef"), gps_info.get("GPSLongitudeRef")

        if "GPSLatitude" in gps_info and "GPSLongitude" in gps_info:
            lat_dms = convert_to_dms(gps_info["GPSLatitude"], lat_ref)
            lon_dms = convert_to_dms(gps_info["GPSLongitude"], lon_ref)

            lat_dec = convert_to_decimal(gps_info["GPSLatitude"], lat_ref)
            lon_dec = convert_to_decimal(gps_info["GPSLongitude"], lon_ref)

        return lat_dms, lon_dms, lat_dec, lon_dec
    except Exception as e:
        print(f"Error processing {image_path}: {e}")
        return None, None, None, None

# Function to convert GPS coordinates into DMS format
def convert_to_dms(value, ref):
    d, m, s = value
    s = round(s, 2)  # Round seconds to two decimal places
    direction = "N" if ref == "N" else "S" if ref == "S" else "E" if ref == "E" else "W"
    
    return f"{int(d)}°{int(m)}'{s}\"{direction}"

# Function to convert GPS coordinates into decimal format
def convert_to_decimal(value, ref):
    d, m, s = value
    decimal = d + (m / 60.0) + (s / 3600.0)
    
    if ref in ["S", "W"]:  # South and West should be negative
        decimal = -decimal
    
    return round(decimal, 6)  # Keeping up to 6 decimal places for precision

# List to store extracted data
image_data = []

# Process each image in the folder
for filename in os.listdir(image_folder):
    if filename.lower().endswith(('.jpg', '.jpeg', '.png')):  # Process only image files
        image_path = os.path.join(image_folder, filename)
        lat_dms, lon_dms, lat_dec, lon_dec = get_gps_data(image_path)

        if lat_dms and lon_dms and lat_dec and lon_dec:  # Ensure valid coordinates
            gmap_link = f"https://www.google.com/maps?q={lat_dec},{lon_dec}"
            image_data.append([lat_dms, lon_dms, lat_dec, lon_dec, gmap_link])

# Convert extracted data to DataFrame
df = pd.DataFrame(image_data, columns=["Latitude (DMS)", "Longitude (DMS)", "Latitude (Decimal)", "Longitude (Decimal)", "GMap Link"])

# Write to Excel
df.to_excel(excel_file, index=False, engine="openpyxl")

print("✅ Excel file updated successfully!")
