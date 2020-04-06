package com.accountmanager.system.api.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

	Path pathLogo;
	@Value("${filepath.imp}")
	private void setPathLogo(String pathnas) {
		pathLogo = Paths.get(pathnas);
	}

	@RequestMapping(value = "/uploadFile/{dir}", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public String uploadFile(@PathVariable("dir") String dir, @RequestParam("file") MultipartFile file)
			throws IOException {
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
	
	@RequestMapping(value = "/fileUpload/{directoryId}", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public String fileUpload(@PathVariable("directoryId") String dir, @RequestParam("file") MultipartFile file)
			throws IOException {
		
		String path = pathNas + "\\" + directoryRepo.findOne(dir).getName() + "\\" + file.getOriginalFilename();
		File convertFile = new File(path);

		convertFile.createNewFile();

		try (FileOutputStream fout = new FileOutputStream(convertFile)) {
			fout.write(file.getBytes());
		} catch (Exception exe) {
			exe.printStackTrace();
		}
		DBFile dbFile = new DBFile();
		dbFile.setFileName(file.getOriginalFilename());
		dbFile.setFileType(file.getName());
		dbFile.setDirectoryId(dir);
		DBFileRepo.save(dbFile);
		return "File has uploaded successfully";
	}

	@RequestMapping(value = "/uploadLogo", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public String fileUploadLogo(@RequestParam("file") MultipartFile file) throws IOException {
		String path = pathLogo + "\\" + file.getOriginalFilename();
		File convertFile = new File(path);

		convertFile.createNewFile();

		try (FileOutputStream fout = new FileOutputStream(convertFile)) {
			fout.write(file.getBytes());
		} catch (Exception exe) {
			exe.printStackTrace();
		}
		return "File has uploaded successfully";
	}

	
	@RequestMapping(value = "/download/{directoryId}", method = RequestMethod.GET)
	public ResponseEntity<Object> downloadFile(@PathVariable("directoryId") String dir) throws IOException {
		DBFile dbFile = DBFileRepo.findOne(dir);
		String filename = pathNas + "\\" + directoryRepo.findOne(dbFile.getDirectoryId()).getName() + "\\" + dbFile.getFileName();
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
		try {
			Path path = Paths.get(pathNas + "\\" + name);
			Directory directory = directoryRepo.findByName(name);
			if (directory == null) {
				Directory dir = new Directory();
				dir.setId(UUID.randomUUID().toString());
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

	@GetMapping("/directory-all")
	private List<HashMap<String, String>> directory() {
		List<HashMap<String, String>> list = new ArrayList<HashMap<String, String>>();
		List<Directory> directories = directoryRepo.findAllGroupByCreateDate();
		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd hh:mm:ss", Locale.US);
		for (Directory directory : directories) {
			HashMap<String, String> map = new HashMap<String, String>();
			map.put("id", directory.getId());
			map.put("name", directory.getName());
			map.put("createDate", dateFormat.format(directory.getCreateDate()));
			list.add(map);
		}
		return list;
	}
	
	@GetMapping("/file-by/{directoryId}")
	private List<HashMap<String, String>> fileAll(@PathVariable("directoryId") String directoryId) {
		List<HashMap<String, String>> list = new ArrayList<HashMap<String, String>>();
		List<DBFile> dbFiles = DBFileRepo.findByDirectoryId(directoryId);
		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd hh:mm:ss", Locale.US);
		for (DBFile dbFile : dbFiles) {
			HashMap<String, String> map = new HashMap<String, String>();
			map.put("id", dbFile.getId());
			map.put("name", dbFile.getFileName());
			map.put("createDate", dateFormat.format(dbFile.getCreated_date()));
			list.add(map);
		}
		return list;
	}

	@GetMapping("/directory-by/{id}")
	private Directory directoryBy(@PathVariable("id") String id) {
		return directoryRepo.findOne(id);
	}

	@PostMapping("/rename-directory")
	private Directory renameDirectory(@RequestBody Directory directory) {
		Directory dir = directoryRepo.findOne(directory.getId());

		File oldfile = new File(pathNas + "\\" + dir.getName());
		File newfile = new File(pathNas + "\\" + directory.getName());
		oldfile.renameTo(newfile);

		dir.setId(directory.getId());
		dir.setName(directory.getName());

		return directoryRepo.save(dir);
	}

	@DeleteMapping("/delete-directory/{id}")
	private String deleteDirectory(@PathVariable("id") String id) {
		String res = "false";
		try {
			File file = new File(pathNas + "\\" + directoryRepo.findOne(id).getName());
			file.delete();
			directoryRepo.delete(id);
			res = "success";
		} catch (Exception e) {
			res = "false";
		}

		return res;
	}
}
