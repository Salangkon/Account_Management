package com.accountmanager.system.service;

import java.util.List;

import com.accountmanager.system.pojo.JournalSearchPojo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

/**
 * JournalSearchService
 */
@Service
public class JournalSearchService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<JournalSearchPojo> searchJournal(String idSearch){

        StringBuilder sb = new StringBuilder();
        sb.append(" SELECT level1.text,level1.pass_code,level2.text as text2,level2.pass_code as pass_code2");
        sb.append(" FROM chart_accounts_level1  AS level1 ");
        sb.append(" INNER JOIN  chart_accounts_level2 AS level2 ON level2.id_lv = level1.id ");
        sb.append(" WHERE level1.text LIKE '"+idSearch+"%' OR level1.pass_code LIKE '%"+idSearch+"%' OR level2.text LIKE '%"+idSearch+"%' OR level2.pass_code LIKE '%"+idSearch+"%'");
        sb.append(" Group by level1.text,level1.pass_code,level2.text,level2.pass_code");
        sb.append(" ORDER BY level1.pass_code");

        List<JournalSearchPojo> searchIdList = jdbcTemplate.query(sb.toString(),
                new BeanPropertyRowMapper(JournalSearchPojo.class));
        return searchIdList;
    }
}