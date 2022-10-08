const { findById } = require("../models/RepairService.Model");
const Service = require("../models/RepairService.Model");
const easyInvoice = require("easyinvoice");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

//create Report of Service/Repair in a vehicle
exports.addReportOfService = async (req, res, next) => {
  const { type, vehino, serviceDate, serviceParts } = req.body;

  const reportOfService = await Service.create({
    type,
    vehino,
    serviceDate,
    serviceParts,
  });

  res.status(200).json({
    success: true,
    reportOfService,
    message: "Report of Service/Repair Details Added",
  });
};

//create Quotation of Service/Repair in a vehicle
exports.createQuotation = async (req, res, next) => {
  console.log(req.body);

  let quotationOfService = await Service.findByIdAndUpdate(req.params.id, {
    items: req.body.items,
    totPrice: req.body.totPrice,
    specialNote: req.body.specialNote,
    isQutationCreated: true,
  });

  if (!quotationOfService) {
    res.status(400).json({
      success: false,
    });
  }

  res.status(200).json({
    success: true,
    quotationOfService,
  });
};

//update Quotation of Service/Repair in a vehicle
exports.updateQuotation = async (req, res, next) => {
  console.log(req.body);

  let quotationOfService = await Service.findByIdAndUpdate(req.params.id, {
    type: req.body.type,
    vehino: req.body.vehino,
    items: req.body.items,
    totPrice: req.body.totPrice,
    specialNote: req.body.specialNote,
    isQutationCreated: true,
  });

  if (!quotationOfService) {
    res.status(400).json({
      success: false,
    });
  }

  res.status(200).json({
    success: true,
    quotationOfService,
  });
};

//Get Details of Report of Service/Repair in a vehicle
exports.getReportOfService = async (req, res, next) => {
  const reportOfService = await Service.find();

  if (!reportOfService) {
    return res.status(400).json({
      success: false,
      message: "Report of Repair/Service Details Not Found",
    });
  }

  res.status(200).json({
    success: true,
    reportOfService,
    message: "Get Report of Repair/Service Details",
  });
};

//Get Details of quotations
exports.getListOfQuotations = async (req, res, next) => {
  const quotationOfService = await Service.find();

  if (!quotationOfService) {
    return res.status(400).json({
      success: false,
      message: "List of Quotations Not Found",
    });
  }

  res.status(200).json({
    success: true,
    quotationOfService,
    message: "Get List of Quotations",
  });
};

//Update Details of Report of Service/Repair in a vehicle
exports.updateReportOfService = async (req, res, next) => {
  let reportOfService = await Service.findById(req.params.id);

  if (!reportOfService) {
    return res.status(400).json({
      success: false,
      message: "Report of Repair/Service Details Not Found",
    });
  }

  reportOfService = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    reportOfService,
    message: "Update Successfull",
  });
};

//Delete Details of Report of Service/Repair in a vehicle
exports.deleteReportOfService = async (req, res, next) => {
  let reportOfService = await Service.findById(req.params.id);

  if (!reportOfService) {
    return res.status(404).json({
      success: false,
      message: "Report of Repair/Service Details Not Found",
    });
  }

  reportOfService = await Service.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    reportOfService,
    message: "Delete Successfull",
  });
};

// 0 defalt
// 1 owner delete
// 2 manager delete
// 4  both delete

//Delete List of Qutations
exports.deleteQuotationsServiceManager = async (req, res, next) => {
  let quotationOfService = await Service.findById(req.params.id);

  if (!quotationOfService) {
    return res.status(404).json({
      success: false,
      message: "List of Quotations Not Found",
    });
  }

  if (quotationOfService.isDeleted == 1 || quotationOfService.isDeleted == 4) {
    quotationOfService = await Service.findByIdAndUpdate(req.params.id, {
      isDeleted: 4,
    });
  } else {
    quotationOfService = await Service.findByIdAndUpdate(req.params.id, {
      isDeleted: 2,
    });
  }

  res.status(200).json({
    success: true,
    quotationOfService,
    message: "Delete Successfull",
  });
};

//Delete List of Qutations
exports.deleteQuotationsOwner = async (req, res, next) => {
  let quotationOfService = await Service.findById(req.params.id);

  if (!quotationOfService) {
    return res.status(404).json({
      success: false,
      message: "List of Quotations Not Found",
    });
  }

  if (quotationOfService.isDeleted == 2 || quotationOfService.isDeleted == 4) {
    quotationOfService = await Service.findByIdAndUpdate(req.params.id, {
      isDeleted: 4,
    });
  } else {
    quotationOfService = await Service.findByIdAndUpdate(req.params.id, {
      isDeleted: 1,
    });
  }

  res.status(200).json({
    success: true,
    quotationOfService,
    message: "Delete Successfull",
  });
};

//check the Report of Service/Repair in a vehicle
exports.checkedReportOfService = async (req, res, next) => {
  let reportid = req.params.id;
  let report = await Service.findById(reportid);

  if (!report) {
    res.status(404).json({
      success: false,
      message: "No Report Found",
    });
  }

  report = await Service.updateOne(
    { _id: reportid },
    { isChecked: true },
    {
      new: true,
      useFindAndModify: false,
    }
  );

  report = await Service.findById(reportid);

  res.status(200).json({
    success: true,
    report,
  });
};

//approve the quotations
exports.approveQuotations = async (req, res, next) => {
  let quotationid = req.params.id;
  let quotations = await Service.findById(quotationid);

  if (!quotations) {
    res.status(404).json({
      success: false,
      message: "Quotations Found",
    });
  }

  quotations = await Service.updateOne(
    { _id: quotationid },
    { isApproved: true },
    {
      new: true,
      useFindAndModify: false,
    }
  );

  quotations = await Service.findById(quotationid);

  res.status(200).json({
    success: true,
    quotations,
  });
};

//Report Generation
exports.serviceReport = async (req, res) => {
  const services = await Service.find();

  if (!services) {
    return res.status(401).json({
      success: false,
      services: [],
      message: "Service Not Found",
    });
  }

  console.log(services);
  let service = [];

  services.map((trip, index) => {
    const oneService = {
      quantity: 1,
      description: trip.vehino,
      tax: 0,
      price: trip.totPrice,
    };

    service.push(oneService);
  });

  const date = new Date(Date.now());

  var data = {
    currency: "LKR",
    taxNotation: "vat",
    marginTop: 25,
    marginRight: 25,
    marginLeft: 25,
    marginBottom: 25,
    logo: "https://res.cloudinary.com/dxz8wbaqv/image/upload/v1633031369/afproject/SPM%20Project/navbar-logo_covajt.png", //or base64
    background: "",
    sender: {
      company: "Black Code Team",
      address: "No 1/11",
      zip: "1234 AB",
      city: "Colombo",
      country: "Sri Lanka",
    },
    invoiceNumber: Date.now(),
    invoiceDate:
      date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
    products: service,
    bottomNotice: `Disclaimer : 
      This report (including any enclosures and attachments) has been prepared for the 
      Calculate the total cost of Repair or Service in a vehicles given time period. Unless we 
      provide express prior written consent, no part of this report should be reproduced, 
      distributed or communicated to any third party. We do not accept any liability if this 
      report is used for an alternative purpose from which it is intended, nor to any third 
      party in respect of this report.`,
  };

  async function genReport() {
    //Create invoice
    const pdf = await easyInvoice.createInvoice(data);
    await fs.writeFileSync("invoice.pdf", pdf.pdf, "base64");

    uploadPdf();
  }

  const uploadPdf = async () => {
    cloudinary.config({
      cloud_name: "dxz8wbaqv",
      api_key: "296131486339646",
      api_secret: "Y3QNUt0uDdfS5DYT0rfB57-Akic",
    });

    cloudinary.uploader.upload("./invoice.pdf").then((result) => {
      res.status(200).json({
        success: true,
        response: result.secure_url,
      });
    });
  };

  genReport();
};