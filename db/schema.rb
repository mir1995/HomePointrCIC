# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_181_114_075_720) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'active_storage_attachments', force: :cascade do |t|
    t.string 'name', null: false
    t.string 'record_type', null: false
    t.bigint 'record_id', null: false
    t.bigint 'blob_id', null: false
    t.datetime 'created_at', null: false
    t.index ['blob_id'], name: 'index_active_storage_attachments_on_blob_id'
    t.index %w[record_type record_id name blob_id], name: 'index_active_storage_attachments_uniqueness', unique: true
  end

  create_table 'active_storage_blobs', force: :cascade do |t|
    t.string 'key', null: false
    t.string 'filename', null: false
    t.string 'content_type'
    t.text 'metadata'
    t.bigint 'byte_size', null: false
    t.string 'checksum', null: false
    t.datetime 'created_at', null: false
    t.index ['key'], name: 'index_active_storage_blobs_on_key', unique: true
  end

  create_table 'applications', force: :cascade do |t|
    t.integer 'status'
    t.text 'description'
    t.bigint 'property_id'
    t.bigint 'info_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index %w[info_id property_id], name: 'index_applications_on_info_id_and_property_id', unique: true
    t.index ['info_id'], name: 'index_applications_on_info_id'
    t.index ['property_id'], name: 'index_applications_on_property_id'
  end

  create_table 'emails', force: :cascade do |t|
    t.integer 'user_id'
    t.string 'email'
    t.boolean 'primary', default: false
    t.string 'unconfirmed_email'
    t.string 'confirmation_token'
    t.datetime 'confirmed_at'
    t.datetime 'confirmation_sent_at'
  end

  create_table 'infos', force: :cascade do |t|
    t.bigint 'tenant_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['tenant_id'], name: 'index_infos_on_tenant_id'
  end

  create_table 'properties', force: :cascade do |t|
    t.integer 'capacity'
    t.text 'description'
    t.bigint 'landlord_id'
    t.integer 'rent'
    t.integer 'size'
    t.integer 'property_type'
    t.integer 'housing_type'
    t.date 'date_available'
    t.integer 'location'
    t.index ['landlord_id'], name: 'index_properties_on_landlord_id'
  end

  create_table 'tenants', force: :cascade do |t|
    t.string 'name'
    t.text 'description'
    t.string 'email'
    t.string 'phone'
    t.string 'nino'
    t.integer 'rent_min'
    t.integer 'rent_max'
    t.integer 'housing_type'
    t.integer 'property_type'
    t.integer 'num_bedrooms'
    t.integer 'location'
    t.bigint 'referral_agency_id'
    t.date 'date_needed'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['referral_agency_id'], name: 'index_tenants_on_referral_agency_id'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'encrypted_password', default: '', null: false
    t.string 'reset_password_token'
    t.datetime 'reset_password_sent_at'
    t.datetime 'remember_created_at'
    t.string 'confirmation_token'
    t.datetime 'confirmed_at'
    t.datetime 'confirmation_sent_at'
    t.string 'unconfirmed_email'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.string 'name'
    t.string 'address'
    t.string 'phone'
    t.string 'type'
    t.index ['reset_password_token'], name: 'index_users_on_reset_password_token', unique: true
  end
end
