package com.accountmanager.system.pojo;

import java.util.List;

public class ReportResponseDTO {

    private String dateForm;
    private String sumPrice;
    private String sumPriceVat;
    private String countNo;
    private String sumProductPriceAll;
    private List <TaxReportDTO> taxReportDTO;

    public String getDateForm() {
        return dateForm;
    }

    public void setDateForm(String dateForm) {
        this.dateForm = dateForm;
    }

    public String getSumPrice() {
        return sumPrice;
    }

    public void setSumPrice(String sumPrice) {
        this.sumPrice = sumPrice;
    }

    public String getSumPriceVat() {
        return sumPriceVat;
    }

    public void setSumPriceVat(String sumPriceVat) {
        this.sumPriceVat = sumPriceVat;
    }

    public String getCountNo() {
        return countNo;
    }

    public void setCountNo(String countNo) {
        this.countNo = countNo;
    }

    public String getSumProductPriceAll() {
        return sumProductPriceAll;
    }

    public void setSumProductPriceAll(String sumProductPriceAll) {
        this.sumProductPriceAll = sumProductPriceAll;
    }

    public List<TaxReportDTO> getTaxReportDTO() {
        return taxReportDTO;
    }

    public void setTaxReportDTO(List<TaxReportDTO> taxReportDTO) {
        this.taxReportDTO = taxReportDTO;
    }
}
