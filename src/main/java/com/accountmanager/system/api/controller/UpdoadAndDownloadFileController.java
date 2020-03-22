package com.accountmanager.system.api.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.accountmanager.system.model.DBFile;
import com.accountmanager.system.model.Directory;
import com.accountmanager.system.repository.DBFileRepository;
import com.accountmanager.system.repository.DirectoryRepository;

@RestController
public class UpdoadAndDownloadFileController {
	@Autowired
	DBFileRepository DBFileRepo;
	@Autowired
	DirectoryRepository directoryRepo;
	Path pathNas;

	@Value("${filepath.path}")
	private void setPathNas(String pathnas) {
		pathNas = Paths.get(pathnas);
	}

	@RequestMapping(value = "/uploadFile/{dir}", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public String fileUpload(@PathVariable("dir") String dir, @RequestParam("file") MultipartFile file) throws IOException {
		String path = pathNas + "\\" + dir + "\\" + file.getOriginalFilename();
		File convertFile = new File(path);

		convertFile.createNewFile();

		try (FileOutputStream fout = new FileOutputStream(convertFile)) {
			fout.write(file.getBytes());
		} catch (Exception exe) {
			exe.printStackTrace();
		}
		DBFile dbFile = new DBFile();
		dbFile.setFileName(path);
		dbFile.setFileType(file.getName());
		DBFileRepo.save(dbFile);
		return "File has uploaded successfully";
	}

	@RequestMapping(value = "/download", method = RequestMethod.GET)
	public ResponseEntity<Object> downloadFile() throws IOException {
		String filename = "D:/work/IMG_20181229_154743.jpg";
		File file = new File(filename);
		InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", file.getName()));
		headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
		headers.add("Pragma", "no-cache");
		headers.add("Expires", "0");

		ResponseEntity<Object> responseEntity = ResponseEntity.ok().headers(headers).contentLength(file.length())
				.contentType(MediaType.parseMediaType("application/txt")).body(resource);

		return responseEntity;
	}

	@GetMapping("/create-directory/{name}")
	private String createDirectory(@PathVariable("name") String name) {
		String res = "false";
		Path path = Paths.get(pathNas + "\\" + name);
		
		try {
			Directory directory = directoryRepo.findByName(name);
			if (directory == null) {
				Directory dir = new Directory();
				dir.setName(name);
				directoryRepo.save(dir);
				
				Files.createDirectories(path);
				res = "success";
			}
		} catch (IOException e) {
			res = "false";
			e.printStackTrace();
		}
		return res;
	}
}
