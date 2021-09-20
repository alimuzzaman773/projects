<div class="card">
    <div class="card-header">
        <div class="row">
            <div class="col-md-6 text-left">Edit Contact</div>
            <div class="col-md-6 text-right"></div>
        </div>
    </div>
    <div class="card-body">
        <form class="row g-3 form" role="form" action="" method="post" id="editContact">
            <input type="text" class="txt_csrfname hidden" name="<?php echo $this->security->get_csrf_token_name(); ?>" value='<?php echo $this->security->get_csrf_hash(); ?>'>
            <div class="col-md-6">
                <label for="name" class="form-label">Name <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="name" required="" name="name" value="<?php echo (isset($contact_details) && isset($contact_details->name) && !empty($contact_details->name) ? $contact_details->name : ''); ?>">
            </div>
            <div class="col-md-6">
                <label for="phone" class="form-label">Phone <span class="text-danger">*</span></label>
                <div class="input-group mb-3">
                    <label class="input-group-text" for="phone">+88</label>
                    <input type="number" class="form-control" id="phone" name="phone" maxlength="11" required="" value="<?php echo (isset($contact_details) && isset($contact_details->phone) && !empty($contact_details->phone) ? $contact_details->phone : ''); ?>">
                </div>
            </div>
            <div class="col-6">
                <label for="company" class="form-label">Company <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="company" name="company" placeholder="1234 Main St" required="" value="<?php echo (isset($contact_details) && isset($contact_details->company) && !empty($contact_details->company) ? $contact_details->company : ''); ?>">
            </div>
            <div class="col-6">
                <label for="address" class="form-label">Address <span class="text-danger">*</span></label>
                <textarea cols="5" class="form-control" rows="1" id="address" name="address" required=""><?php echo (isset($contact_details) && isset($contact_details->address) && !empty($contact_details->address) ? $contact_details->address : ''); ?></textarea>
            </div>
            <div class="col-12">
                <input type="hidden" id="contact_id" name="contact_id" value="<?php echo (isset($contact_details) && isset($contact_details->id) && !empty($contact_details->id) ? $contact_details->id : ''); ?>">
                <button type="submit" class="btn btn-primary pull-right">Update</button>
            </div>
        </form>
    </div>
</div>

