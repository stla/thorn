#' HTML widget displaying a shader
#'
#' @description Creates a HTML widget displaying a shader.
#'
#' @param shader the name of the shader, one of \code{"thorn"},
#'   \code{"thorn-color"}, \code{"ikeda"}, \code{"sweet"}, \code{"biomorph1"},
#'   \code{"biomorph2"}, \code{"biomorph3"}, \code{"apollony"}, \code{"smoke"},
#'   \code{"plasma"}
#' @param width,height a valid CSS measurement (like \code{"100\%"},
#'   \code{"400px"}, \code{"auto"}) or a number, which will be coerced to a
#'   string and have \code{"px"} appended
#' @param elementId a HTML id for the widget
#'
#' @import htmlwidgets
#'
#' @export
#'
#' @examples library(thorn)
#' thorn("ikeda") # click on the shader to animate it
#' thorn("thorn") # you can also use the mouse wheel on this one
#'
#' # four shaders ####
#' library(htmltools)
#'
#' hw1 <- thorn("thorn-color", width = "50vw", height = "50vh")
#' hw2 <- thorn("ikeda", width = "50vw", height = "50vh")
#' hw3 <- thorn("sweet", width = "50vw", height = "50vh")
#' hw4 <- thorn("biomorph3", width = "50vw", height = "50vh")
#'
#' if(interactive()){
#'   browsable(
#'     withTags(
#'       div(
#'         div(
#'           style = "position:absolute; top:0;",
#'           div(hw1, style="position:fixed; left:0;"),
#'           div(hw2, style="position:fixed; left:50vw;")
#'         ),
#'         div(
#'           style = "position:absolute; top:50vh;",
#'           div(hw3, style="position:fixed; left:0;"),
#'           div(hw4, style="position:fixed; left:50vw;")
#'         )
#'       )
#'     )
#'   )
#' }
thorn <- function(
  shader,
  width = NULL, height = NULL,
  elementId = NULL
) {

  # forward options using x
  x = list(
    shader = match.arg(shader, c(
      "thorn",
      "thorn-color",
      "ikeda",
      "biomorph1",
      "biomorph2",
      "biomorph3",
      "sweet",
      "apollony",
      "smoke",
      "plasma"
    ))
  )

  # create widget
  htmlwidgets::createWidget(
    name = "thorn",
    x,
    width = width,
    height = height,
    package = "thorn",
    elementId = elementId
  )
}

#' Shiny bindings for \code{thorn}
#'
#' Output and render functions for using \code{\link{thorn}} within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height a valid CSS measurement (like \code{"100\%"},
#'   \code{"400px"}, \code{"auto"}) or a number, which will be coerced to a
#'   string and have \code{"px"} appended
#' @param expr an expression that generates a shader created with
#'   \code{\link{thorn}}
#' @param env the environment in which to evaluate \code{expr}
#' @param quoted logical, whether \code{expr} is a quoted expression
#'
#' @name thorn-shiny
#'
#' @export
#'
#' @examples # use a shader as the background of a Shiny app ####
#' library(thorn)
#' library(shiny)
#'
#' ui <- fluidPage(
#'   thornOutput("thorn", width = "100%", height = "100%"),
#'   br(),
#'   sidebarLayout(
#'     sidebarPanel(
#'       sliderInput(
#'         "slider", "Slide me",
#'         value = 10, min = 0, max = 20
#'       ),
#'       selectInput(
#'         "select", "Select me", choices = c("Choice 1", "Choice 2")
#'       )
#'     ),
#'     mainPanel()
#'   )
#' )
#'
#' server <- function(input, output){
#'
#'   output[["thorn"]] <- renderThorn({
#'     thorn("biomorph2")
#'   })
#'
#' }
#'
#' if(interactive()){
#'   shinyApp(ui, server)
#' }
#'
#' # all available shaders ####
#' library(thorn)
#' library(shiny)
#'
#' ui <- fluidPage(
#'   br(),
#'   sidebarLayout(
#'     sidebarPanel(
#'       wellPanel(
#'         radioButtons(
#'           "shader", "Shader",
#'           choices = c(
#'             "thorn",
#'             "thorn-color",
#'             "ikeda",
#'             "biomorph1",
#'             "biomorph2",
#'             "biomorph3",
#'             "sweet",
#'             "apollony",
#'             "smoke"
#'           )
#'         )
#'       )
#'     ),
#'     mainPanel(
#'       thornOutput("shader", width = "calc(100% - 15px)", height = "400px")
#'     )
#'   )
#' )
#'
#' server <- function(input, output){
#'
#'   output[["shader"]] <- renderThorn({
#'     thorn(input[["shader"]])
#'   })
#'
#' }
#'
#' if(interactive()){
#'   shinyApp(ui, server)
#' }
thornOutput <- function(outputId, width = "100%", height = "100%"){
  htmlwidgets::shinyWidgetOutput(
    outputId, "thorn", width, height, package = "thorn"
  )
}

#' @rdname thorn-shiny
#' @export
renderThorn <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, thornOutput, env, quoted = TRUE)
}
